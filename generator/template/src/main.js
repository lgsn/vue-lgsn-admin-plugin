import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from "./i18n"
import * as Util from './utils/utils'
import http from './utils/ajax';
import VueWechatTitle from 'vue-wechat-title'

import './assets/css/reset.scss'

Vue.config.productionTip = false

Vue.use(VueWechatTitle);

Vue.prototype.$Utils = Util;
Vue.prototype.$ajax = http;

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
