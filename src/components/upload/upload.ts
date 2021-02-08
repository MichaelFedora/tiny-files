import tinyApi from 'services/tiny-api';
import { getFileIcon } from '../../util';
import Vue from 'vue';
import { PropValidator } from 'vue/types/options';
import { debounce, DebouncedFunc } from 'lodash';
import dataBus from 'services/data-bus';

export default Vue.component('tiny-upload', {
  props: {
    files: { type: Array, required: false, default: () => [] } as PropValidator<File[]>,
    dir: { type: String, required: false, default: () => '/' },
    familiar: { type: Boolean, required: false, default: false }
  },
  data() { return {
    working: false,

    remFiles: [] as number[],
    localFiles: [] as File[],
    uploadDir: '/',
    status: '',
    progress: 0,

    dragging: false,
    throttledDragover: null as DebouncedFunc<() => void>,
  }; },
  computed: {
    fileList(): { file: File, type: string, fileIcon: string, fileIconColor: string }[] {
      return [...this.files.filter((_, i) => !this.remFiles.includes(i)), ...this.localFiles].map(file => {
        const type = file.type;
        return {
          file, type, ...getFileIcon(type)
        }
      });
    }
  },
  watch: {
    dir(n, o) {
      if(n && n !== o)
        this.uploadDir = n;
    }
  },
  mounted() {
    this.uploadDir = this.dir || '/';
    this.throttledDragover = debounce(() => this.dragging = !this.dragging, 333, { leading: true, trailing: true });
  },
  methods: {
    async upload() {
      if(this.working) return;
      this.working = true;

      if(!this.uploadDir.endsWith('/'))
        this.uploadDir += '/';

      if(this.familiar) {
        if(this.uploadDir.startsWith('/public'))
          this.uploadDir = dataBus.publicScope + this.uploadDir.slice('/public'.length);
        else
          this.uploadDir = dataBus.privateScope + this.uploadDir;
      }

      for(const entry of this.fileList) {
        this.status = 'uploading ' + entry.file.name + '...';
        await tinyApi.files.write(this.uploadDir + entry.file.name, await entry.file.arrayBuffer(), entry.type, event => this.progress = Math.round(event.loaded * 10000 / event.total) / 100);
      }

      this.status = '';
      this.working = false;
      this.$emit('close', true);
    },
    remFile(file: File) {
      const oldIdx = this.files.indexOf(file);
      if(oldIdx >= 0)
        this.remFiles.push(oldIdx);
      else
        this.localFiles = this.localFiles.filter(a => a !== file);
    }
  }
});
