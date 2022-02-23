import { arrayTransferMap, mergeArray } from '@/utils/tools'
import { arrayToMap } from '@/utils/tools'
import configInfo from '../../config/config'
import { MockBaseAppInfo, MockResponse } from '../../config/mock'

const state = {
  userInfo: {},
  userMenu: [],
  userRights: new Map(),
  roles: false,
  appInfo: {},
  baseAppInfo: {}
}

const getters = {
  userInfo: state => state.userInfo,
  roles: state => state.roles
}

const mutations = {
  userInfo(state, data) {
    state.userInfo = data
  },
  setUserMenu(state, data) {
    state.userMenu = data
  },
  setRoles: (state, data) => {
    state.roles = data
  },
  setAppInfo: (state, data) => {
    state.appInfo = data
  },
  setBaseAppInfo: (state, data) => {
    state.baseAppInfo = data
  },
  setUserRights: (state, data) => {
    state.userRights = arrayTransferMap(data, 'code')
  }
}

const actions = {
  // 获取用户信息
  async getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      /**
       * 这里是mock数据
       * 正常情况下你应该使用API来获取当前用户信息
       */
      const response = MockResponse
      const baseAppInfo = MockBaseAppInfo
      const isAuth = !response.data.phoneAuth || response.data.simplePwd
      commit('setBaseAppInfo', arrayToMap(baseAppInfo.data))
      commit('userInfo', {
        ...response.data,
        isAuth
      })
      resolve()
    })
  },
  // 获取用户菜单
  getUserMenu({ commit }) {
    return new Promise((resolve, reject) => {
      /**
       * 这里是mock数据
       * 正常情况下你应该 接口获取
       */
      const mockFlag = true
      if (mockFlag) {
        const appInfo = configInfo.app
        // 合并筛选菜单权限
        const mergeAllMenus = mergeArray(configInfo.menus, configInfo.authMenus)
        // 当前应用信息
        commit('setAppInfo', appInfo)
        // 已授权用户菜单
        commit('setUserMenu', configInfo.authMenus)
        // 菜单权限标识
        commit('setRoles', true)
        // 用户操作权限
        commit('setUserRights', configInfo.resources)
        resolve(mergeAllMenus)
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
