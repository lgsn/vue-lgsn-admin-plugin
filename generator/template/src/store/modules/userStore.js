import { getUserAuth } from '@/api/public'
import { arrayTransferMap, mergeArray } from '@/utils/tools'
import { arrayToMap } from '@/utils/tools'
import { APPCODE } from '@/config/public'
import { message } from 'ant-design-vue'
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
    // const response = await userInfo()
    // const baseAppInfo = await zeusConfig({ appCode: 'gaea', module: 'home' })
    /**
     * TODO
     * 这里是mock数据
     * 正常情况下你应该使用上面的方法获取数据
     */
    const response = MockResponse
    const baseAppInfo = MockBaseAppInfo
    const isAuth = !response.data.phoneAuth || response.data.simplePwd
    commit('setBaseAppInfo', arrayToMap(baseAppInfo.data))
    commit('userInfo', {
      ...response.data,
      isAuth
    })
  },
  // 获取用户菜单
  getUserMenu({ commit }) {
    return new Promise((resolve, reject) => {
      /**
       * TODO
       * 这里是mock数据
       * 正常情况下你应该 mockFlag === false 情况下数据
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
      } else {
        getUserAuth({ appCode: APPCODE }).then(res => {
          if (!res.data.authMenus.length && !res.data.menus.length) {
            message.error('配置信息错误, 请联系管理员')
            reject()
            return
          }
          if (!res.data.authMenus.length) {
            message.error('当前账号，无菜单权限。 3秒后返回登录')
            reject()
            return
          }
          const appInfo = res.data.app
          // 合并筛选菜单权限
          const mergeAllMenus = mergeArray(res.data.menus, res.data.authMenus)
          // 当前应用信息
          commit('setAppInfo', appInfo)
          // 已授权用户菜单
          commit('setUserMenu', res.data.authMenus)
          // 菜单权限标识
          commit('setRoles', true)
          // 用户操作权限
          commit('setUserRights', res.data.resources)
          resolve(mergeAllMenus)
        }).catch(err => reject(err))
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
