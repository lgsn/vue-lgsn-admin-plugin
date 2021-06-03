import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/antComponents'
import './styles/index.scss'
import 'ant-design-vue/dist/antd.css'
import './permission'
import './utils/iconfont'
import './utils/layoutIcon'
import './utils/directive'
import { setWebSiteConfig } from './utils/tools'

Vue.config.productionTip = false
Vue.prototype.$setWebSite = setWebSiteConfig

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
