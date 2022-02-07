<template>
<div id='tiny-login' class='content'>
  <h1>login</h1>
  <div class='form'>
    <b-field>
      <b-input placeholder='username@tinyhome.site' pattern='\w+@.+' v-model='origin' icon-right='account' @keyup.native.enter='login()' :disabled='working' />
    </b-field>
  </div>
  <div id='buttons'>
    <a :class='{
      disabled: !origin || working,
      "has-text-grey-lighter": origin && !working,
      "hover-warning": origin && !working
    }' @click='login(false)'>login (root)</a>
    <div style='flex-grow: 1'/>
    <b-button type='is-primary' :disabled='!origin || working' @click='login()' :loading='working'>login</b-button>
  </div>
</div>
</template>
<script lang='ts'>
import Vue from 'vue';
import dataBus from '@/services/data-bus';
import tinyApi from '@/services/tiny-api';

export default Vue.extend({
  name: 'tiny-login',

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

      const res = await tinyApi.auth.getSessions(dataBus.homeUrl, '' + this.$route.query.code).then(() => true, e => false);
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
</script>
<style lang='scss'>
#tiny-login {
  display: inline-block;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);

  > div#buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;

    > button:not(:last-child) {
      margin-right: 0.5rem;
    }

    > a {
      font-size: 0.8rem;
    }
  }
}
</style>
