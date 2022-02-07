<template>
<div id='app'>
  <b-dropdown id='account-dropdown' position='is-bottom-left' v-if='loggedIn'>
    <button slot='trigger' id='menu-fab' class='has-background-primary' :title='username'><b-icon icon='account' /></button>
    <b-dropdown-item @click='manage()' class='hover-info'>manage shares</b-dropdown-item>
    <b-dropdown-item @click='logout()'>logout</b-dropdown-item>
  </b-dropdown>
  <router-view />
</div>
</template>
<script lang='ts'>
import Vue from 'vue';
import tinyApi from '@/services/tiny-api';
import { DialogProgrammatic } from 'buefy';
import dataBus from '@/services/data-bus';

export default Vue.extend({
  name: 'app',
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
    async manage() {
      DialogProgrammatic.alert({
        type: 'is-info',
        message: 'to be implemented ;3'
      });
    },
    async logout() {
      await tinyApi.auth.logout();
      this.$router.push('/login');
      this.loggedIn = false;
    }
  }
});
</script>
<style lang='scss'>
div#app {
  div#account-dropdown {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 20;

    button#menu-fab {
      display: flex;
      align-items: center;
      justify-content: center;

      color: white;

      border: none;
      padding: 0.5em;
      box-shadow: 0 1px 5px rgba(0,0,0,0.33);
      border-radius: 50%;

      cursor: pointer;
      user-select: none;
      z-index: 1;
    }
  }
}
</style>
