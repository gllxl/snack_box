import Vue from 'vue'
import VueRouter from 'vue-router'
import {Cookies} from 'quasar';

import store from '../store/index.js'
import routes from "./routes";
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });
  Router.beforeEach((to, from, next) => {
    Router.app.$options.store.commit('getCode',getQueryVariable('code'));
    Router.app.$options.store.commit('getShopId',getQueryVariable('state'));
    if(!Router.app.$options.store.state.user_info.access_token && to.path != '/author'){
      // 第一次进入项目跳转至Author页面
      next('/author');
      return false
    }
    next()
  });
  return Router
}
