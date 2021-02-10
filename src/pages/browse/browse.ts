import { DialogProgrammatic, ModalProgrammatic } from 'buefy';
import { debounce, DebouncedFunc, throttle } from 'lodash';
import dataBus from 'services/data-bus';
import tinyApi from 'services/tiny-api';
import { FileListAdvance, PathedFileInfo } from 'types';
import Vue from 'vue';

import UploadModal from 'components/upload/upload';
import { v4 } from 'uuid';

export default Vue.component('tiny-browse', {
  data() {
    const data = {
      working: false,
      paths: null as PathedFileInfo[],
      rawPaths: [] as string[],
      dir: '/',

      suppressDragging: false,
      dropFiles: [] as File[],
      dragging: false,
      throttledDragover: null as DebouncedFunc<() => void>,

      getLink: (path: string) =>
        (data.familiarLayout && data.personal)
          ? path.startsWith('/public')
            ? tinyApi.files.getReadUrl(dataBus.publicScope + path.slice('/public'.length))
            : tinyApi.files.getReadUrl(dataBus.privateScope + path)
          : tinyApi.files.getReadUrl(path),
      familiarLayout: true,
      personal: !dataBus.storeScopes.includes('/') && dataBus.storeScopes.length === 2
    };
    return data;
  },
  computed: {
    canUpload(): boolean {
      return (this.personal && this.familiarLayout)
        || (this.dir && Boolean(dataBus.storeScopes.find(s => this.dir.startsWith(s))));
    }
  },
  watch: {
    dropFiles(n: File[], o: File[]) {
      if(n.length) {
        this.upload(n);
        this.dropFiles = [];
      }
    }
  },
  async mounted() {
    this.throttledDragover = debounce(() => this.dragging = !this.dragging, 333, { leading: true, trailing: true });
    await this.refresh();
  },
  methods: {
    async refresh() {
      if(this.working) return;
      this.working = true;

      const listFilesLoop = async (scope: string) => {
        const ret: FileListAdvance['entries'] = { };
        let page = undefined;
        do {
          const res = await tinyApi.files.listFiles(scope, true, page);
          if(scope === '/')
            scope = '';
          for(const e in res.entries)
            ret[scope + e] = res.entries[e];
          page = res.page || undefined;
        } while(page);
        return ret;
      }
      const entries = await Promise.all(dataBus.storeScopes.map(listFilesLoop))
        .then(res => res.reduce((acc, c) => Object.assign(acc, c)));
      this.rawPaths = Object.keys(entries);

      let pathData = [] as PathedFileInfo[];

      for(const path of this.rawPaths)
        pathData.push(Object.assign({ }, entries[path], { path }));

      if(this.familiarLayout && this.personal) {
        const privateScope = dataBus.privateScope, publicScope = dataBus.publicScope;
        pathData = pathData.filter(a => !a.path.startsWith(privateScope + '/public') && !a.path.startsWith(publicScope + '/shares'));
        for(const entry of pathData) {
          if(entry.path.startsWith(privateScope))
            entry.path = entry.path.slice(privateScope.length);
          else if(entry.path.startsWith(publicScope))
            entry.path = '/public' + entry.path.slice(publicScope.length);
        }

        if(!this.rawPaths.find(a => a.startsWith(publicScope)))
          pathData.push({ path: '/public/null', name: 'Nothing here...', type: 'none', size: 0, modified: 0 });

      } else if(dataBus.storeScopes.includes('/')) {
        if(!this.rawPaths.find(a => a.startsWith('/public')))
          pathData.push({ path: '/public/null', name: 'Nothing here...', type: 'none', size: 0, modified: 0 });

      } else {
        for(const scope of dataBus.storeScopes)
          if(!this.rawPaths.find(a => a.startsWith(scope)))
            pathData.push({ path: scope === '/' ? '/null' : scope + '/null', name: 'Nothing here...', type: 'none', size: 0, modified: 0 });
      }

      this.paths = pathData;

      this.working = false;
    },
    open(path: string) {
      window.open(this.getLink(path), '__blank');
    },
    mapPath(path: string) {
      if(this.familiarLayout && this.personal) {
        if(/^\/public/.test(path))
          return dataBus.publicScope + path.slice('/public'.length);
        else
          return dataBus.privateScope + path;
      } else
        return path;
    },
    mapPaths(paths: string[]) {
      if(this.familiarLayout && this.personal) {
        paths = paths.map(p => {
          if(/^\/public/.test(p))
            return dataBus.publicScope + p.slice('/public'.length);
          else
            return dataBus.privateScope + p;
        });
      }

      return paths;
    },
    async remove({ type, paths, path }: { type: 'folder' | 'file' | 'paths', paths?: string[], path?: string }) {
      if(this.working) return;
      this.working = true;

      if(path)
        paths = [this.mapPath(path)];
      else
        paths = this.mapPaths(paths);

       /// @todo when switching to bulk delete, check if there are no raw paths, and return early if so
      if(type !== 'file')
        await Promise.all(this.rawPaths.filter(a => paths.find(p => a.startsWith(p))).map(p => tinyApi.files.delete(p).catch(() => { })));
      else
        await tinyApi.files.delete(paths[0]).catch(() => { });

      this.working = false;
      return this.refresh();
    },
    async _copy({ from, paths, to }: { from: string, paths: string[], to: string }): Promise<string[]> {
      const fromPaths = this.mapPaths(paths);
      const toPaths = this.mapPaths(paths.map(p => to + p.slice(from.length)));
      const copyFoo = async (fromPath: string, toPath: string): Promise<void> => {
        const file: Blob = await tinyApi.files.read(fromPath, 'blob');
        await tinyApi.files.write(toPath, await file.arrayBuffer());
      }
      await Promise.all(paths.map((_, i) => copyFoo(fromPaths[i], toPaths[i]).catch(() => { })));
      return fromPaths;
    },
    async copy({ from, paths, to }: { from: string, paths: string[], to: string }) {
      if(this.working) return;
      this.working = true;
      await this._copy({ from, paths, to });
      this.working = false;
      return this.refresh();
    },
    async move({ from, paths, to }: { from: string, paths: string[], to: string }) {
      if(this.working) return;
      this.working = true;
      const fromPaths = await this._copy({ from, paths, to });
      await Promise.all(fromPaths.map(p => tinyApi.files.delete(p).catch(() => { })));
      this.working = false;
      return this.refresh();
    },
    async share(path: string | string[]) {
      if(this.working) return;
      this.working = true;

      let link = '';

      if(!(path instanceof Array)) {
        if(!path.startsWith('/public'))
          return;

        const mapped = this.mapPath(path);
        path = this.rawPaths.filter(a => a.startsWith(mapped))
      }

      path = this.mapPaths(path.filter(a => a.startsWith('/public')));
      if(!path.length) return;
      if(path.length > 1) {
        const shareJson = { entries: path };
        let uuid = v4();
        let sharePath = dataBus.publicScope + '/shares/' + uuid + '.json';
        while(this.rawPaths.includes(sharePath = dataBus.publicScope + '/shares/' + uuid + '.json'))
          uuid = v4();

        const te = new TextEncoder();
        await tinyApi.files.write(sharePath, te.encode(JSON.stringify(shareJson)), 'application/json');

        link = location.origin + (this.$router.mode === 'hash' ? '#' : '') + '/explore?store=' + dataBus.storeUrl + '&user=' + dataBus.storeUser.username + '&share=' + uuid;
      } else
        link = tinyApi.files.getPublicReadUrl('asdf', path[0].slice('/public'.length));

      DialogProgrammatic.prompt({
        title: 'Share Item(s)',
        message: 'Here is the link to share:',
        inputAttrs: { readonly: true, value: link },
        confirmText: 'Got it'
      });

      this.working = false;
      return this.refresh();
    },
    upload(files?: File[]) {
      ModalProgrammatic.open({
        component: UploadModal,
        props: { files, familiar: this.familiarLayout && this.personal, dir: this.dir },
        onCancel: () => this.refresh(),
        events: { close: changed => changed ? this.refresh() : null }
      });
    }
  }
})
