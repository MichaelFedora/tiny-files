import { ModalProgrammatic } from 'buefy';
import { debounce, DebouncedFunc, throttle } from 'lodash';
import dataBus from 'services/data-bus';
import tinyApi from 'services/tiny-api';
import { PathedFileInfo } from 'types';
import Vue from 'vue';

import UploadModal from 'components/upload/upload';

export default Vue.component('tiny-browse', {
  data() {
    const data = {
      working: false,
      paths: null as PathedFileInfo[],
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

      const entries = await Promise.all(dataBus.storeScopes.map(scope => tinyApi.files.listFiles(scope, true).then(res => res.entries)))
        .then(res => res.reduce((acc, c) => Object.assign(acc, c)));
      const bigList = Object.keys(entries);

      let pathData = [] as PathedFileInfo[];

      for(const path of bigList)
        pathData.push(Object.assign({ }, entries[path], { path }));

      if(this.familiarLayout && this.personal) {
        const privateScope = dataBus.privateScope, publicScope = dataBus.publicScope;
        pathData = pathData.filter(a => !a.path.startsWith(privateScope + '/public'));
        for(const entry of pathData) {
          if(entry.path.startsWith(privateScope))
            entry.path = entry.path.slice(privateScope.length);
          else if(entry.path.startsWith(publicScope))
            entry.path = '/public' + entry.path.slice(publicScope.length);
        }

        if(!bigList.find(a => a.startsWith(publicScope)))
          pathData.push({ path: '/public/null', name: 'Nothing here...', type: 'none', size: 0, modified: 0 });

      } else {
        for(const scope of dataBus.storeScopes)
          if(!bigList.find(a => a.startsWith(scope)))
            pathData.push({ path: scope === '/' ? '/null' : scope + '/null', name: 'Nothing here...', type: 'none', size: 0, modified: 0 })
      }

      this.paths = pathData;

      this.working = false;
    },
    open(path: string) {
      window.open(this.getLink(path), '__blank');
    },
    async remove({ type, path }: { type: 'folder' | 'file', path: string }) {
      if(this.working) return;
      this.working = true;

      await tinyApi.files.delete(path);

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
