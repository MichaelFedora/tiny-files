import Vue from 'vue';

// @ts-ignore
import('@mdi/font/css/materialdesignicons.css');


import { // @ts-ignore
  Button, Input, Field, Icon, Loading, Dialog, Modal, Toast, Dropdown, DialogProgrammatic, Upload
} from 'buefy';
import './buefy.scss';

import './styles.scss';

import { makeInitializerComponent } from './util';


import AppComponent from './app.vue';
import LoadingComponent from './components/loading.vue';
import TinyExplorer from './components/explorer/explorer.vue';

import router from './router';
import dataBus from '@/services/data-bus';
import tinyApi from '@/services/tiny-api';

console.log('Environment:', import.meta.env.MODE);

Vue.use(Button);
Vue.use(Input);
Vue.use(Field);
Vue.use(Icon);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Modal);
Vue.use(Toast);
Vue.use(Dropdown);
Vue.use(Upload);

if(import.meta.env.VITE_DOCS) {
  const [_, path, query, hash] = location.href.match(/^([^#?]+)([^#]+)?(#.+)?$/);
  if(query) {
    if(!hash)
      location.href = path + '#' + query;
    else
      location.href = path + hash + (!hash.includes('?') ? query : '&' + query.slice(1));
  }
}

const v = new Vue({
  router,
  el: '#app',
  components: { AppComponent, TinyExplorer },
  data: { loaded: false },
  render(h) {
    if(this.loaded) {
      return h(AppComponent, { key: 'app' });
    } else return makeInitializerComponent(h, LoadingComponent);
  }
});

(async () => {
  // hmmm
  if(dataBus.storeSession)
    dataBus.storeUser = await tinyApi.auth.getStoreUser();

})().then(() => {
  console.log('Initialized Main!');
  v.loaded = true;
}, e => {
  console.error('Error initializing main: ', e.stack || e.message || e);
  DialogProgrammatic.alert({
    title: 'Error',
    message: 'Error initializing main: ' + String(e.message || e),
    type: 'is-danger'
  });
});
