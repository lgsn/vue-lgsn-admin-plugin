import router from './router'
import Cookies from 'js-cookie'
import store from './store'
import { defaultRouterPath } from './config/public'
import { logout } from '@/api/public'
import { message } from 'ant-design-vue'

// 白名单
const allowList = ['login', 'error', 'exception', 'fault']
// 需要登录的页面
const tokenView = [defaultRouterPath]
// 登录地址
const loginRoutePath = '/login'

router.beforeEach(async(to, from, next) => {
  // 配置信息
  store.dispatch('baseConfigStore/iniGlobalConfig')

  // 是否登录
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
      next({ path: defaultRouterPath })
    } else {
      // 用户菜单是否存在
      const hasRoles = store.getters.roles
      if (hasRoles) {
        // 路由是否存在
        const toRights = store.getters.routeRightsMap.get(to.path)
        if (!toRights && !tokenView.includes(to.path)) {
          next('error')
        } else if (toRights && !toRights.rights) {
          // 无权限
          if (to.path === '/') {
            message.error('菜单配置信息错误，请联系管理员')
          } else {
            next('exception')
          }
        } else if (to.path === defaultRouterPath) {
          /**
           * 前往系统默认页
           * 跳转至系统菜单中当一条菜单
           */
          const defaultRouterView = store.getters.userMenu[0]
          const routerUrl = defaultRouterView.children.length ? defaultRouterView.children[0].link : defaultRouterView.link
          next(routerUrl)
        } else {
          next()
        }
      } else {
        // 获取用户信息/包含用户菜单 用户操作权限
        const responseRouters = await store.dispatch('getUserMenu')
        // 动态生成路由表
        const accessRoutes = await store.dispatch('permissionStore/generateRoutes', responseRouters)
        // 注册路由
        router.addRoute(
          {
            path: defaultRouterPath,
            name: defaultRouterPath,
            component: () => import('@/layouts/BasicLayout'),
            children: accessRoutes
          })
        next({ ...to, replace: true })
      }
    }
  } else {
    logout()
  }
})

router.afterEach(() => {
})
