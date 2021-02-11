import axios from 'axios';
import dataBus from 'services/data-bus';
import tinyApi from 'services/tiny-api';
import { FileListAdvance, PathedFileInfo } from 'types';
import { computeShortestPath, handleError } from '../../util';
import Vue from 'vue';

export default Vue.component('tiny-explore', {
  data() {
    const data = {
      working: false,
      paths: null as PathedFileInfo[],
      rawPaths: [] as string[],
      rootPath: '',
      dir: '/',

      store: '',
      user: '',
      share: '',

      getLink: (path: string) => tinyApi.files.getPublicReadUrl(data.user, (data.rootPath + path).slice('/public'.length), data.store)
    };
    return data;
  },
  computed: {
    rootName(): string {
      return this.user + "@" + this.store.replace(/^.+?:\/\//, '') + this.rootPath;
    }
  },
  async mounted() {
    if(!this.$route.query.store || !this.$route.query.user || !this.$route.query.share)
      this.$router.replace('/');

    this.store = '' + this.$route.query.store;
    this.user = '' + this.$route.query.user;
    this.share = '' + this.$route.query.share;

    await this.refresh();
  },
  methods: {
    async refresh() {
      if(this.working) return;
      this.working = true;
      const publicRootLength = '/public'.length;

      this.rawPaths = await axios.get(`${this.store}/public/${this.user}`
       + `${dataBus.publicScope.slice(publicRootLength)}/shares/${this.share}.json`)
       .then(res => res.data.entries, e => { handleError(e); return [] });

      if(!this.rawPaths.length) {
        this.paths = [];
        this.working = false;
        return;
      }

      const entries = await axios.post<FileListAdvance['entries']>(`${this.store}/public-info/${this.user}`, this.rawPaths.map(p => p.slice(publicRootLength)))
        .then(res => res.data, e => { handleError(e); return { } });

      if(Object.keys(entries).length !== this.rawPaths.length) {
        console.log('some entries are missing!');
        this.rawPaths = Object.keys(entries);
      }

      this.rootPath = computeShortestPath(this.rawPaths);

      const pathData = [] as PathedFileInfo[];
      for(const path of this.rawPaths)
        pathData.push(Object.assign({ }, entries[path.slice(publicRootLength)], { path: path.slice(this.rootPath.length) }));

      // get root path and abstract

      this.paths = pathData;

      this.working = false;
    },
    open(path: string) {
      window.open(this.getLink(path), '__blank');
    },
  }
})
