import Vue from 'vue';
import tinyApi from 'services/tiny-api';
import { DialogProgrammatic } from 'buefy';
import dataBus from 'services/data-bus';

export default Vue.component('app', {
  data() { return {
    loggedIn: Boolean(dataBus.homeSession),
    username: dataBus.storeUser?.username || ''
  }; },
  watch: {
    $route(n, o) {
      if(n.path !== o.path && !this.loggedIn && !/^\/login/.test(n.path))
        this.loggedIn = Boolean(dataBus.homeSession);
    }
  },
  methods: {
    async settings() {
      DialogProgrammatic.alert({
        type: 'is-info',
        message: 'to be implemented ;3'
      });
    },
    async logout() {
      await tinyApi.auth.logout();
      this.$router.push('/login');
      this.loggedIn = false;
    },
    async deleteSelf() {
      const choice = await new Promise<boolean>(res => DialogProgrammatic.confirm({
        title: 'Delete Account',
        type: 'is-danger',
        message: 'Are you sure you want to delete your account? This cannot be undone.',
        onCancel: () => res(false),
        onConfirm: () => res(true)
      }));

      if(choice) {
        await tinyApi.deleteSelf();
        this.$router.push('/login');
        this.loggedIn = false;
      }
    }
  }
});
