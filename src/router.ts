import Vue from 'vue';
import VueRouter from 'vue-router';

const HomePage = () => import('./pages/home/home');
const BrowsePage = () => import('./pages/browse/browse');
const SettingsPage = () => import('./pages/settings/settings');
const LoginPage = () => import('./pages/login/login');
import NotFoundPage from './pages/not-found/not-found';
import dataBus from './services/data-bus';


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/browse', name: 'home' }, // no idea
    { path: '/browse**', component: BrowsePage, name: 'browse' }, // own files
    // { path: '/explore/:origin/:username/:share/**', component: ExplorePage, name: 'explore' }, // other's files
    { path: '/settings', component: SettingsPage, name: 'settings' }, // public pages, sharing, customizing file/db conns, etc
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

  if(!dataBus.homeToken && !/^\/login/.test(to.path))
    next('/login?goto=' + to.fullPath);

  next();
});

export default router;
