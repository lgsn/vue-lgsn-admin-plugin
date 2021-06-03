/**
 * @Description:
 * @author Guan LinTao
 * @date 17:40 下午
 * 路由配置
*/
import Vue from 'vue'
import Router from 'vue-router'
import basicRouting from './basicRouting'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

// 默认基础路由
const routes = basicRouting

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
