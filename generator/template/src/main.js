import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/antComponents'
import 'ant-design-vue/dist/antd.css'
import './permission'
import './styles/global.scss'
import './utils/kgIcon'
import './utils/directive'
import { setWebSiteConfig } from './utils/tools'

Vue.config.productionTip = false
Vue.prototype.$setWebSite = setWebSiteConfig

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
