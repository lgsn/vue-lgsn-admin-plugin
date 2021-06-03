/**
 * @Description:
 * @author Guan LinTao
 * @date 6:09 下午
 * 路由表
 */
import { routerComponents, arrayTransferMap } from '@/utils/tools'
import basicRouting from '@/router/basicRouting'

export default {
  namespaced: true,
  state: {
    // 路由表
    routes: [],
    // 路由权限表
    routeRightsMap: new Map()
  },
  mutations: {
    setRoutes: (state, routes) => {
      state.routes = routes
    },
    setRouteRightsMap: (state, routes) => {
      state.routeRightsMap = routes
    }
  },
  actions: {
    // 菜单数据 处理为router格式
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const routeRights = new Map()
        // 生成路由数据格式
        const accessedRoutes = routerComponents(data, routeRights)
        arrayTransferMap(basicRouting, 'name', routeRights)
        commit('setRoutes', accessedRoutes)
        commit('setRouteRightsMap', routeRights)
        resolve(accessedRoutes)
      })
    }
  }
}
