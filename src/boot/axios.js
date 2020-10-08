import Vue from 'vue';
import axios from 'axios';
import { Notify } from 'quasar';
import router from 'src/router';
import api from '../apis'; // 导入api接口

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// if (process.env.DEV) {
//   axios.defaults.baseURL = 'http://lsp.chinaqwe.top:10001/';
// } else if (process.env.PROD) {
//   axios.defaults.baseURL = 'http://lsp.chinaqwe.top:10001/';
// }
axios.defaults.baseURL = 'http://lsp.chinaqwe.top:10001/';

const toLogin = () => {
  router.replace({
    path: '/author',
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};

const tip = msg => {
  Notify.create({
    message: msg,
    timeout: 1000,
  });
};

const errorHandle = (status, msg) => {
  // 状态码判断
  switch (status) {
    case 401:
      toLogin();
      break;
    case 403:
      tip(msg.info);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    case 404:
      tip(msg.info);
      break;
    default:
      console.log(msg);
  }
};

const instance = axios.create();
instance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      if (res.data.code !== 200) {
        errorHandle(res.data.code, res.data.data);
      } else {
        return Promise.resolve(res);
      }
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
    }
  });
export default instance;

Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
