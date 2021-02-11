import Vue from 'vue';
import { PropValidator } from 'vue/types/options';
import _ from 'lodash';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import filesize from 'filesize';
import { DateTime } from 'luxon';
import axios from 'axios';

import { PathedFileInfo } from 'types';
import { getFileIcon } from '../../util';
import { DialogProgrammatic, ToastProgrammatic } from 'buefy';

interface EntryInfo {
  path: string;
  name: string;
  size: string;
  rawSize: number;
  lastModified: string;
  rawLastModified: number;

  itemCount?: number;

  contentType?: string;
  fileIcon?: string;
  fileIconColor?: string;
}

export default Vue.component('tiny-explorer', {
  props: {
    rootName: { type: String, required: false, default: 'root' },
    rootRoute: { type: String, required: true },
    paths: { type: Array, required: true } as PropValidator<PathedFileInfo[]>,
    mapLink: { type: Function, required: true } as PropValidator<(path: string) => string>,
    viewOnly: Boolean
  },
  data() {

    const rootInfo: EntryInfo = {
      path: '/',
      name: 'root',
      size: filesize(0),
      rawSize: 0,
      lastModified: 'null',
      rawLastModified: 0
    };

    const data = {
      // "exploring"
      dir: '/',
      dirInfo: rootInfo,

      index: { } as { [path: string]: { files: EntryInfo[]; folders: EntryInfo[] } },
      rootInfo,

      // downloading/uploading
      working: false,
      progress: 0,
      workingOn: '',

      // clipboard (paths)
      cut: false,
      from: '',
      clipboard: [] as string[],

      // sorting
      sortByName: 'name',
      sortByDir: false,

      // context menu
      showContextMenu: false,
      contextItemType: '',
      contextItem: null as EntryInfo,

      // selection
      lastActive: '',
      lastActiveTime: 0,
      active: {} as { [key: string]: boolean },
      anyActive: false,

      // selection box
      drawing: false,
      drawBegin: { x: 0, y: 0 },
      drawPoints: { x1: 0, y1: 0, x2: 0, y2: 0 },
      drawPos: {
        top: '0px',
        left: '0px',
        height: '0px',
        width: '0px'
      },
    };
    return data;
  },
  computed: {
    splitDir(): string[] {
      const sdir = [];
      let buff = '';
      this.dir.replace(/^\/|\/$/g, '').split('/').forEach(v => {
        if(!v) buff += '/';
        else if(buff) sdir.push(buff + v);
        else sdir.push(v);
      });
      return [
        this.rootName,
        ...sdir
      ];
    },

    sortedFolders(): EntryInfo[] {
      if(!this.index || !this.index[this.dir])
        return [];
      return this.sortEntries(this.index[this.dir].folders);
    },

    sortedFiles(): EntryInfo[] {
      if(!this.index || !this.index[this.dir])
        return [];
      return this.sortEntries(this.index[this.dir].files);
    }
  },
  watch: {
    dir() {
      this.active = { };
      this.lastActive = '';
      this.lastActiveTime = 0;

      if(this.sliceRouteForDir() !== this.dir)
        this.$router.replace({ path: this.rootRoute + this.dir, query: this.$route.query });

      if(this.dir.length > 1 && this.index && this.index[this.dir]) {
        const idx = this.dir.lastIndexOf('/', this.dir.length - 2);
        const dirParent = this.dir.slice(0, idx + 1);
        const dirName = this.dir.slice(idx + 1, -1);
        const info = this.index[dirParent] ? this.index[dirParent].folders.find(a => a.name === dirName) : null;
        this.dirInfo = info || this.rootInfo;
      } else
        this.dirInfo = this.rootInfo;

      this.$emit('update:dir', this.dir);
    },
    paths() {
      this.refresh();
    },
    $route() {
      if(this.sliceRouteForDir() !== this.dir && this.index[this.sliceRouteForDir()])
        this.dir = this.sliceRouteForDir();
    },
    active() {
      this.anyActive = this.active && Object.values(this.active).reduce((a, b) => a || b, false);
    }
  },
  async mounted() {
    window.addEventListener('mousedown', this.closeContextMenu);
    window.addEventListener('mouseup', this.drawEnd);
    window.addEventListener('mousemove', this.drawContinue);
    window.addEventListener('keydown', this.shortcutHandler);

    this.refresh();

    if(this.index[this.sliceRouteForDir()])
      this.dir = this.sliceRouteForDir();
    else
      this.$router.replace({ path: this.rootRoute, query: this.$route.query });
  },
  destroyed() {
    window.removeEventListener('mousedown', this.closeContextMenu);
    window.removeEventListener('resize', this.closeContextMenu);
    window.removeEventListener('mouseup', this.drawEnd);
    window.removeEventListener('mousemove', this.drawContinue);
    window.removeEventListener('keydown', this.shortcutHandler);
  },
  methods: {
    sliceRouteForDir(): string {
      let path = this.$route.path.slice(this.rootRoute.length);
      if(!path.endsWith('/'))
        path += '/';
      return path;
    },
    formatDate(time: number) {
      return DateTime.fromMillis(time, { zone: 'utc' }).toLocal().toLocaleString(DateTime.DATETIME_SHORT);
    },
    sortEntries(entries: EntryInfo[]): EntryInfo[] {
      return entries.sort((_a, _b) => {
        let a: EntryInfo, b: EntryInfo;
        if(!this.sortByDir) {
          a = _a;
          b = _b;
        } else {
          b = _a;
          a = _b;
        }

        switch(this.sortByName) {
          case 'size': return b.rawSize - a.rawSize;
          case 'mod': return b.rawLastModified - a.rawLastModified;
          case 'name':
          default:
            return a.name.localeCompare(b.name);
        }
      });
    },
    sort(col: string) {
      if(col === this.sortByName)
        this.sortByDir = !this.sortByDir;
      else {
        this.sortByName = col;
        this.sortByDir = false;
      }

    },
    goto(dir: number) {
      if(dir <= 0) {
        this.dir = '/';
        return;
      } else if(dir >= this.splitDir.length)
        return;

      const d = '/' + this.splitDir.slice(1, dir + 1).join('/');
      this.dir = d.endsWith('/') ? d : d + '/';
    },
    newFolder() {
      DialogProgrammatic.prompt({
        title: 'new folder name',
        message: '',
        inputAttrs: { pattern: '(?:(?:[\\.][ \\.]*)?[\\w\\-](?:[\\w\\- \\.]*[\\w\\-]+)?\\/?)+' },
        cancelText: 'cancel',
        confirmText: 'create',
        onConfirm: res => {
          if(!res || !/^(?:(?:[\.][\ \.]*)?[\w\-](?:[\w\-\ \.]*[\w\-]+)?\/?)+$/.test(res)) return;

          const paths = res.split('/').filter(a => Boolean(a));
          for(let i = 0; i < paths.length; i++) {
            const parentPath = this.dir + (i > 0 ? paths.slice(0, i).join('/') + '/' : '');
            this.$set(this.index, parentPath + paths[i] + '/', { files: [], folders: [] });
            this.index[parentPath].folders.push({
              name: paths[i],
              path: parentPath + paths[i] + '/',
              lastModified: '--',
              rawLastModified: 0,
              rawSize: 0,
              size: '--',
              itemCount: -1
            });
            this.$forceUpdate();
          }
        }
      });
    },
    rename(type: 'file' | 'folder', item: EntryInfo) {
      DialogProgrammatic.prompt({
        title: 'rename ' + type + ' "' + item.name + '"',
        message: '',
        inputAttrs: { pattern: '(?:[\\.][ \\.]*)?[\\w\\-](?:[\\w\\- \\.]*[\\w\\-]+)?' },
        cancelText: 'cancel',
        confirmText: 'rename',
        onConfirm: res => {
          if(!res || !/^(?:[\.][\ \.]*)?[\w\-](?:[\w\-\ \.]*[\w\-]+)?$/.test(res))
            return;

          const path = type === 'file' ? item.path.slice(0, item.path.lastIndexOf('/')) : item.path;

          if(type === 'file')
            this.$emit('move', { from: item.path, paths: [item.path], to: path + '/' + res });
          else
            this.$emit('move', { from: path, paths: this.paths.filter(a => a.path.startsWith(path)).map(a => a.path), to: path.slice(0, path.lastIndexOf('/'))+ '/' + res })
        }
      });
    },
    refresh() { // make index

      const index: { [name: string]: { files: EntryInfo[]; folders: EntryInfo[] } } = { };
      if(!this.index || Object.keys(this.index).length === 0)
        this.index = index;

      const oldestLatestModifiedDates: { [path: string]: { oldest: number; latest: number } } = { };
      for(const entry of this.paths) {

        // create folder objects
        const folders = entry.path.split('/').map((p, i, arr) => arr.slice(0, i).join('/') + '/').slice(1);

        for(let i = 0, fpath = folders[i]; i < folders.length; i++, fpath = folders[i]) {
          if(!index[fpath]) {
            index[fpath] = { files: [], folders: [] };
          }

          if(i + 1 < folders.length) {
            const subFName = folders[i + 1].slice(folders[i + 1].lastIndexOf('/', folders[i + 1].length - 2)).replace(/\//g, '');
            if(!index[fpath].folders.find(a => a.name === subFName)) {
              index[fpath].folders.push({
                path: fpath + subFName,
                name: subFName,
                size: '--',
                rawSize: 0,
                lastModified: '--',
                rawLastModified: 0,
                itemCount: 0
              });
            }
          }
        }

        if(entry.size === 0 && entry.modified === 0 && entry.path.endsWith('null'))
          continue;

        // file logic
        const folder = index[folders[folders.length - 1]];
        const fileName = entry.name || entry.path.slice(entry.path.lastIndexOf('/', entry.path.length - 2) + 1);
        const file = folder.files.find(a => a.name === fileName);
        const rawLastModified = entry.modified;
        // new
        if(!file) {
          const newFile: EntryInfo = {
            name: fileName,
            path: entry.path,
            rawSize: entry.size,
            size: filesize(entry.size),
            rawLastModified: rawLastModified,
            lastModified: this.formatDate(rawLastModified),
            contentType: entry.type,
            ...getFileIcon(entry.type)
          };
          folder.files.push(newFile);
          oldestLatestModifiedDates[entry.path] = { oldest: rawLastModified, latest: rawLastModified };
          // new file & newer modified & has size
        } if(oldestLatestModifiedDates[entry.path].latest < rawLastModified && entry.size > 0) {
          file.rawSize = entry.size;
          file.size = filesize(entry.size);
          file.rawLastModified = rawLastModified;
          file.lastModified = this.formatDate(rawLastModified);
          file.contentType = entry.type;
          const icon = getFileIcon(entry.type);
          file.fileIcon = icon.fileIcon;
          file.fileIconColor = icon.fileIconColor;
          oldestLatestModifiedDates[entry.path] = { oldest: rawLastModified, latest: rawLastModified };
          // it's just old (or non existant)
        } else { }
      }

      // post-entries logic -- fill out folder information
      // make sure we process the farthest folders first (i.e. the longest paths)
      // so the shorter ones can reference their children
      let paths = Object.keys(index).filter(a => index[a] && (index[a].folders.length || index[a].files.length));
      paths = paths.sort((a, b) => a.length === b.length ? a.localeCompare(b) : b.length - a.length);
      // currentPath = 0;
      for(const path of paths) {
        /* currentPath++;
        this.workingOn = 'Filling folder information (' + currentPath + '/' + paths.length + ')...';
        this.progress = currentPath / paths.length;*/
        let totalSize = 0;
        let lastModified = 0;
        let itemCount = 0;

        for(const f of index[path].folders) {
          totalSize += f.rawSize;
          lastModified = Math.max(lastModified, f.rawLastModified);
          itemCount += f.itemCount;
        }

        for(const f of index[path].files) {
          totalSize += f.rawSize;
          lastModified = Math.max(lastModified, f.rawLastModified);
          itemCount++;
        }

        if(path.length > 1) {
          const idx = path.lastIndexOf('/', path.length - 2);
          const subPath = path.slice(0, idx + 1);
          const fName = path.slice(idx + 1, -1);
          const folder = index[subPath].folders.find(a => a.name === fName);
          folder.rawSize = totalSize;
          folder.size = filesize(totalSize);
          folder.rawLastModified = lastModified;
          folder.lastModified = this.formatDate(lastModified);
          folder.itemCount = itemCount;
        } else {
          this.rootInfo.rawSize = totalSize;
          this.rootInfo.size = filesize(totalSize);
          this.rootInfo.rawLastModified = lastModified;
          this.rootInfo.lastModified = this.formatDate(lastModified);
          this.rootInfo.itemCount = itemCount;
        }
      }
      this.index = index;
      this.$forceUpdate();
    },
    clickItem(event: MouseEvent, item: EntryInfo, folder = false) {
      const name = folder ? '/' + item.name : item.name;
      if(event.getModifierState('Shift') || event.shiftKey) {
        const allItems = this.index[this.dir].folders.map(a => '/' + a.name).concat(this.index[this.dir].files.map(a => a.name));
        const s1 = allItems.indexOf(this.lastActive);
        const s2 = allItems.indexOf(name);
        const items = allItems.slice(Math.min(s1, s2), Math.max(s1, s2) + 1);

        if(event.getModifierState('Control') || event.ctrlKey)
          for(const i of items)
            Vue.set(this.active, i, true);
        else
          this.active = items.reduce((acc, c) => { acc[c] = true; return acc; }, { });

        this.lastActiveTime = 0;
        return; // no 'lastActive' whatnot
      } else if(event.getModifierState('Control') || event.ctrlKey) {
        this.$set(this.active, name, !this.active[name]);
        this.lastActiveTime = 0;
      } else {
        this.active = { [name]: true };
        if(Date.now() - this.lastActiveTime < 333) { // 1/3 of a sec
          if(name.startsWith('/'))
            this.openFolder(name.slice(1));
          else
            this.openFile(item.path);

          this.lastActiveTime = 0;
        }
        this.lastActiveTime = Date.now();
      }

      this.lastActive = name;
    },
    getSelected(): { items: string[], paths: string[] } {
      const items: string[] = [];
      for(const k in this.active) if(this.active[k] === true)
        items.push(k.startsWith('/') ? k.slice(1) : k);

      let entries: PathedFileInfo[] = [];
      for(const i of items) {
        entries = entries.concat(this.paths
          .filter(a => a.path.startsWith(this.dir + i)));
      }

      return { items, paths: entries.map(a => a.path) };
    },
    selectAll() {
      const items = this.index[this.dir].files.map(a => a.name).concat(this.index[this.dir].folders.map(a => '/' + a.name));
      const inactiveItem = Boolean(items.find(a => !this.active[a]));

      if(inactiveItem)
        for(const i of items)
          this.$set(this.active, i, true);
      else
        for(const i of items)
          this.$set(this.active, i, false);
    },
    cutItem(type: 'file' | 'folder', path: string) {
      this.cut = true;
      this.from = this.dir.slice(0, -1);
      if(type === 'file')
        this.clipboard = [path];
      else
        this.clipboard = this.paths.filter(a => a.path.startsWith(path)).map(e => e.path)
    },
    cutSelected() {
      this.cut = true;
      this.from = this.dir.slice(0, -1);
      this.clipboard = this.getSelected().paths;
    },
    copyItem(type: 'file' | 'folder', path: string) {
      this.cut = false;
      this.from = this.dir.slice(0, -1);
      if(type === 'file')
        this.clipboard = [path];
      else
        this.clipboard = this.paths.filter(a => a.path.startsWith(path)).map(e => e.path)
    },
    copySelected() {
      this.cut = false;
      this.from = this.dir.slice(0, -1);
      this.clipboard = this.getSelected().paths;
    },
    clearClipboard() {
      this.cut = false;
      this.from = this.dir.slice(0, -1);
      this.clipboard = [];
    },
    paste() {
      this.pasteInto(this.dir.slice(0, -1));
    },
    pasteInto(path: string) {
      this.$emit(this.cut ? 'move' : 'copy', { from: this.from, paths: this.clipboard, to: path });
      if(this.cut) {
        this.cut = false;
        this.clipboard = [];
      }
      this.from = '';
    },
    async removeSelected() {
      const selected = this.getSelected().paths;
      if(!await new Promise<boolean>(res => DialogProgrammatic.confirm({
        type: 'is-danger',
        title: 'delete selected',
        message: 'are you sure you want to delete the ' + selected.length + ' selected item(s)?',
        onConfirm: () => res(true),
        onCancel: () => res(false)
      }))) return;

      this.$emit('delete', { type: 'paths', paths: selected });
    },
    shareSelected() {
      this.$emit('share', this.getSelected().paths)
    },
    renameSelected() {
      let type: 'folder' | 'file', entry: EntryInfo;
      if(this.lastActive.startsWith('/')) {
        type = 'folder';
        const name = this.lastActive.slice(1);
        entry = this.index[this.dir].folders.find(a => a.name === name);
      } else {
        type = 'file';
        entry = this.index[this.dir].files.find(a => a.name === this.lastActive);
      }

      if(entry)
        this.rename(type, entry);
    },
    openFolder(folder: string) {
      if(this.dir)
        this.dir = this.dir + folder + '/';
      else
        this.dir = '/' + folder + '/';
    },
    async openFile(path: string, open = true): Promise<Blob> {
      if(open)
        this.$emit('open', path);
      else
        return axios.get(this.mapLink(path), { responseType: 'blob' }).then(res => res.data);
    },
    async downloadSelected() {
      if(this.working)
        return;

      const { items, paths } = this.getSelected();

      let name = items.length === 1 ?
        items[0] :
        this.splitDir.length === 1 ?
          'tiny-files-data' :
          this.splitDir[this.splitDir.length - 1];

      return this.download(this.dir, paths, name);
    },
    async downloadDir(path: string) {
      if(this.working)
        return;

      if(!path.endsWith('/'))
        path += '/';
      if(path.startsWith('/'))
        path = path.slice(1);

      let name: string;
      if(path.length < 2)
        name = 'tiny-files-data';
      else {
        const idx = path.lastIndexOf('/', path.length - 2);
        const dirName = path.slice(idx + 1, -1);
        name = dirName;
      }

      const downloadPaths = this.paths.filter(a => a.path.startsWith(path)).map(e => e.path);

      return this.download(path.slice(0, -1), downloadPaths, name);
    },
    async download(root: string, items: string[], name: string) {
      if(this.working)
        return;
      this.working = true;
      this.progress = 0;

      if(items.length === 1 && !items[0].slice(root.length + 1).includes('/')) {
        FileSaver.saveAs(this.mapLink(items[0]), name.replace('*', ''));
        this.working = false;
        return;
      }

      const prefixLen = root.length;

      const zip = new JSZip();
      for(let n = 0, it = items[n]; n < items.length; n++, it = items[n]) {
        console.log('download:', it);
        const itName = it.slice(prefixLen);
        this.progress = n / items.length;
        this.workingOn = 'Zipping ' + itName;
        await new Promise(resolve => setTimeout(resolve, 333));
        zip.file(itName, await this.openFile(it, false));
      }
      this.progress = 1;
      this.workingOn = 'Serving the Zip';
      console.log('zipping...');
      const blob = await zip.generateAsync({ type: 'blob' });
      console.log('serving...');
      FileSaver.saveAs(blob, name.replace('*', ''));
      console.log('done');
      this.workingOn = '';
      this.working = false;
      this.progress = 0;
    },
    drawStart(event: MouseEvent) {
      if(event.button !== 0)
        return;

      this.drawing = true;
      Vue.set(this.drawBegin, 'x', event.x);
      Vue.set(this.drawBegin, 'y', event.y);
      this.drawPoints = { x1: event.x, x2: event.x, y1: event.y, y2: event.y };
      this.drawPos = { top: event.y + 'px', left: event.x + 'px', height: 0 + 'px', width: 0 + 'px' };
    },
    boxInside(
      a: { x1: number; y1: number; x2: number; y2: number },
      b: { x1: number; y1: number; x2: number; y2: number }) {
      return !(a.x1 > b.x2 ||
              a.x2 < b.x1 ||
              a.y1 > b.y2 ||
              a.y2 < b.y1);
    },
    drawContinue: _.throttle(function(this, event: MouseEvent) {
      if(!this.drawing) return;
      Vue.set(this.drawPoints, 'y1', Math.min(event.y, this.drawBegin.y)); // top
      Vue.set(this.drawPoints, 'x1', Math.min(event.x, this.drawBegin.x)); // left
      Vue.set(this.drawPoints, 'y2', Math.max(event.y, this.drawBegin.y)); // bottom
      Vue.set(this.drawPoints, 'x2', Math.max(event.x, this.drawBegin.x)); // right

      Vue.set(this.drawPos, 'top', this.drawPoints.y1 + 'px');
      Vue.set(this.drawPos, 'left', this.drawPoints.x1 + 'px');
      Vue.set(this.drawPos, 'height', this.drawPoints.y2 - this.drawPoints.y1 + 'px');
      Vue.set(this.drawPos, 'width', this.drawPoints.x2 - this.drawPoints.x1 + 'px');

      const children = (this.$refs.explorer as HTMLElement).children;

      for(let i = 0, child = children.item(i); i < children.length; i++, child = children.item(i)) {
        if(!(child.classList.contains('folder') || child.classList.contains('file')))
          continue;

        const box = child.getBoundingClientRect();
        const b = {
          x1: box.left,
          y1: box.top,
          x2: box.right,
          y2: box.bottom
        };

        if(this.boxInside(b, this.drawPoints))
          child.classList.add('hover');
        else if(child.classList.contains('hover'))
          child.classList.remove('hover');
      }
    }, 15), // a little over 60 per second
    drawEnd(event: MouseEvent) {
      if(!this.drawing || event.button !== 0)
        return;

      this.drawing = false;
      const children = (this.$refs.explorer as HTMLElement).children;

      const newActive = [];
      for(let i = 0, child = children.item(i); i < children.length; i++, child = children.item(i)) {
        if(!(child.classList.contains('folder') || child.classList.contains('file')))
          continue;

        if(child.classList.contains('hover')) {
          const itemMatch = /m-(.+)/.exec(child.id);
          if(itemMatch && itemMatch[1])
            newActive.push(itemMatch[1]);
          child.classList.remove('hover');
        }
      }

      if(!(event.getModifierState('State') || event.shiftKey))
        this.active = { };
      for(const i of newActive)
        Vue.set(this.active, i, true);
    },
    fileDragStart(event: DragEvent, file: EntryInfo) {
      if(this.viewOnly) return;
      this.$emit('dragging', true);
      event.dataTransfer.setData('text/plain', file.path);

      if(this.active[file.name] !== true) {
        if(this.anyActive)
          for(const item in this.active)
            this.$set(this.active, item, false);
        this.$set(this.active, file.name, true);
      }
      this.lastActive = file.name;
      this.lastActiveTime = Date.now();

      event.dataTransfer.effectAllowed = 'move';
      // (event.target as HTMLElement).style.cursor = 'move';
      (event.target as HTMLElement).style.opacity = '0.5';
    },
    folderDragStart(event: DragEvent, folder: EntryInfo) {
      if(this.viewOnly) return;
      this.$emit('dragging', true);
      event.dataTransfer.setData('text/plain', folder.path);
      event.dataTransfer.effectAllowed = 'move';

      if(this.active['/' + folder.name] !== true) {
        if(this.anyActive)
          for(const item in this.active)
            this.$set(this.active, item, false);
        this.$set(this.active, '/' + folder.name, true);
      }
      this.lastActive = '/' + folder.name;
      this.lastActiveTime = Date.now();

      // (event.target as HTMLElement).style.cursor = 'move';
      (event.target as HTMLElement).style.opacity = '0.5';
    },
    dragEnd(event: DragEvent) {
      if(this.viewOnly) return;
      // (event.target as HTMLElement).style.cursor = 'default';
      (event.target as HTMLElement).style.opacity = '';
      this.$nextTick(() => this.$emit('draggingEnd', true));
    },
    dragOver(event: DragEvent) {
      if(this.viewOnly) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    nullEvent(event: DragEvent) {
      if(this.viewOnly) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'none';
    },
    folderDrop(event: DragEvent, folder: EntryInfo) {
      if(this.viewOnly) return;
      event.preventDefault();


      let paths: string[];
      let from = '';
      if(!this.anyActive) {
        const path = event.dataTransfer.getData('text/plain');
        paths = this.paths.filter(a => a.path.startsWith(path)).map(a => a.path);
        if(paths.length < 1)
          return;

        from = path.slice(0, path.lastIndexOf('/'));
      } else {
        paths = this.getSelected().paths;
        from = this.dir.slice(0, -1);
      }

      if(paths.find(a => a.startsWith(folder.path)))
        return;

      if(from === folder.path)
        return;
      // move
      this.$emit(event.ctrlKey ? 'copy' : 'move', { from, paths, to: folder.path });
    },
    contextMenu(event: MouseEvent, type?: 'file' | 'folder', item?: EntryInfo) {
      event.preventDefault();

      if(type && item) {
        this.lastActiveTime = Date.now();
        this.lastActive = (type === 'folder' ? '/' : '') + item.name;
        if(!this.active[this.lastActive])
          for(const name in this.active) this.$set(this.active, name, false);
        this.$set(this.active, this.lastActive, true);

        this.contextItem = item;
        this.contextItemType = type;

      } else {
        this.contextItemType = '';
        this.contextItem = null;
      }

      const elem = this.$refs['contextmenu'] as HTMLDivElement;

      this.showContextMenu = true;

      this.$nextTick(() => {
        if(event.clientX + elem.offsetWidth > window.innerWidth) {
          elem.style.right = (window.innerWidth - event.clientX) + 'px';
          elem.style.left = '';
        } else {
          elem.style.left = event.clientX + 'px';
          elem.style.right = '';
        }

        if(event.clientY + elem.offsetHeight > window.innerHeight) {
          elem.style.bottom = (window.innerHeight - event.clientY) + 'px';
          elem.style.top = '';
        } else {
          elem.style.top = event.clientY + 'px';
          elem.style.bottom = '';
        }
      });
    },
    closeContextMenu() {
      if(!this.showContextMenu) return;
      this.showContextMenu = false;
    },
    shortcutHandler(event: KeyboardEvent) {
      if(this.viewOnly || document.querySelector('div.modal.is-active'))
        return;

      if(event.ctrlKey) {
        if(event.key === 'a') {
          event.preventDefault();
          this.selectAll();
        } else if(event.key === 'x' && this.anyActive) {
          this.cutSelected();
          ToastProgrammatic.open({ message: 'cut selected', queue: false, position: 'is-bottom' });
        } else if(event.key === 'c' && this.anyActive) {
          this.copySelected();
          ToastProgrammatic.open({ message: 'copy selected', queue: false, position: 'is-bottom' });
        } else if(event.key === 'v' && this.clipboard.length) {
          this.paste();
          ToastProgrammatic.open({ message: 'pasted clipboard', queue: false, position: 'is-bottom' });
        }
      } else if(event.shiftKey) {
        if(event.key === 'A' || event.key === 'N') {
          event.preventDefault();
          this.newFolder();
          ToastProgrammatic.open({ message: 'new folder', queue: false, position: 'is-bottom' });

        } else if(event.key === 'R' && this.lastActive) {
          event.preventDefault();
          this.renameSelected();
        } else if(event.key === 'X' && this.anyActive) {
          this.removeSelected();
        } else if(event.key === 'D' && this.anyActive) {
          this.downloadSelected();
        } else if(event.key === 'S') {
          event.preventDefault();
          if(this.anyActive)
            this.shareSelected();
          else
            this.$emit('share', this.dir.slice(0, -1));
          ToastProgrammatic.open({ message: 'share' + (this.anyActive ? ' selected' : ' dir'), queue: false, position: 'is-bottom' });
        }
      }
    },
    getPath(folder: string) {
      return this.rootRoute + this.dir + folder;
    },
    getLink(file: string): string {
      return this.mapLink(file);
    }
  }
});
