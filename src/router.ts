import Vue from 'vue';
import VueRouter from 'vue-router';

const BrowsePage = () => import('./pages/browse/browse');
const ExplorePage = () => import('./pages/explore/explore');
const LoginPage = () => import('./pages/login.vue');

import NotFoundPage from './pages/not-found.vue';
import dataBus from './services/data-bus';


Vue.use(VueRouter);

const router = new VueRouter({
  mode: import.meta.env.VITE_DOCS ? 'hash' : 'history',
  routes: [
    { path: '/', redirect: '/browse' },
    { path: '/browse**', component: BrowsePage, name: 'browse' }, // own files
    { path: '/explore**', component: ExplorePage, name: 'explore' }, // other's files
    { path: '/login', component: LoginPage, name: 'login' }, // loggin in (obv)
    { path: '**', component: NotFoundPage, name: 'not-found' }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.path !== from.path) {
    if(to.path.length > 1) {

      const sdir = [];
      let buff = '';
      to.path.slice(1).split('/').forEach(v => {
        if(!v) buff += '/';
        else {
          if(buff) sdir.push(buff + v);
          else sdir.push(v);
        }
      });

      document.title = 'tiny files - ' + sdir.join(' - ');
    } else document.title = 'tiny files';
  }

  if(!dataBus.homeSession && !/^\/(login|explore)/.test(to.path))
    next({ path: '/login', query: Object.assign({ goto: to.path }, to.query) });

  next();
});

export default router;
