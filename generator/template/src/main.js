import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/ElCom'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/global.scss'
import './permission'
import './utils/proIcon'
import './utils/directive'
import { setWebSiteConfig } from './utils/tools'

Vue.config.productionTip = false
Vue.prototype.$setWebSite = setWebSiteConfig

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
