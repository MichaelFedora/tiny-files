import dataBus from 'services/data-bus';
import tinyApi from 'services/tiny-api';
import Vue from 'vue';

export default Vue.component('tiny-login', {

  data() { return {
    working: false,
    origin: '',
  }; },
  watch: {
    registering(n, o) {
      if(!n === !o) return;
      this.origin = '';
    }
  },
  async mounted() {
    if(this.$route.query.code && dataBus.homeUrl) {
      this.working = true;

      const res = await tinyApi.auth.getTokens(dataBus.homeUrl, '' + this.$route.query.code).then(() => true, e => false);
      if(res) {
        dataBus.storeUser = await tinyApi.auth.getStoreUser();
        this.$router.push('/browse');
      } else {
        dataBus.clear();
        this.$router.replace('/login');
      }

      this.working = false;
    }
  },
  methods: {
    async login(personal?: boolean) {
      if(this.working || !this.origin || !/\w+@.+/.test(this.origin)) return;
      this.working = true;

      const success = await tinyApi.auth.login(this.origin, personal).then(() => true, e => false);
      if(success) {
        if(this.$route.query.goto && !(this.$route.query.goto instanceof Array))
          this.$router.push(this.$route.query.goto);
        else
          this.$router.push('/');
      }

      this.working = false;
    }
  }
});
