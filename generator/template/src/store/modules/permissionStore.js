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
        // 菜单数据格式修改为 路由数据格式
        const accessedRoutes = routerComponents(data, routeRights)
        // 在全部菜单中标识当前用户是否可访问此菜单
        arrayTransferMap(basicRouting, 'name', routeRights)
        // 全部路由
        commit('setRoutes', accessedRoutes)
        // 菜单路由权限
        commit('setRouteRightsMap', routeRights)
        resolve(accessedRoutes)
      })
    }
  }
}
