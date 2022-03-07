import router from './router'
import Cookies from 'js-cookie'
import store from './store'
import { dynamicRouting } from './config/public'
import { Message } from 'element-ui'

// 页面白名单
const allowList = ['login', 'error', 'exception', 'fault']
// 需要登录的页面
const tokenView = [dynamicRouting]
// 登录页地址
const loginRoutePath = '/login'

router.beforeEach(async(to, from, next) => {
  // 当前访问页面是否需要登录
  if (allowList.includes(to.name)) {
    next()
  } else if (Cookies.get('userToken')) {
    /**
     * 当前是否前往登录
     * 已登录状态直接跳转不需要登录 前往配置的地址
     */
    // 用户信息
    if (!store.getters.userInfo.id) await store.dispatch('getUserInfo')

    // 登录状态下 无需再次登陆 跳转到默认页
    if (to.path === loginRoutePath) {
      next({ path: dynamicRouting })
    } else {
      // 用户菜单是否存在
      const hasRoles = store.getters.roles
      if (hasRoles) {
        // 路由是否存在
        const toRights = store.getters.routeRightsMap.get(to.path)

        /**
         * 检查页面是否存在
         */
        if (!toRights && !tokenView.includes(to.path)) {
          next('error')
        } else if (toRights && !toRights.rights) {
          /**
           * 检查页面可以访问
           */
          if (to.path === '/') {
            // 菜单配置错误
            Message.error('菜单配置信息错误，请联系管理员')
          } else {
            next('exception')
          }
        } else if (to.path === dynamicRouting) {
          /**
           * 前往系统默认页
           * 跳转至系统菜单中当一条菜单
           */
          next(store.getters.defaultPath)
        } else {
          next()
        }
      } else {
        // 获取菜单
        const responseRouters = await store.dispatch('getUserMenu')
        // 动态生成路由表
        const accessRoutes = await store.dispatch('permissionStore/generateRoutes', responseRouters)
        // 注册路由
        router.addRoute(
          {
            path: dynamicRouting,
            name: dynamicRouting,
            component: () => import('@/layouts/BasicLayout'),
            children: accessRoutes
          })
        next({ ...to, replace: true })
      }
    }
  } else {
    /**
     * 访问地址不在白名单
     * &&
     * 用户没有登录
     * 跳转到登录页
     */
    next(loginRoutePath)
  }
})

router.afterEach(() => {
})
