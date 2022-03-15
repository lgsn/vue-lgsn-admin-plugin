import { arrayTransferMap, mergeArray, arrayFilter } from '@/utils/tools'
import configInfo from '../../config/config'
import Cookie from 'js-cookie'

const state = {
  userInfo: {},
  userMenu: [],
  userRights: new Map(),
  roles: false,
  defaultPath: ''
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
    const defaultPage = data && data.length ? data[0] : {}
    state.defaultPath = defaultPage.children && defaultPage.children.length ? defaultPage.children[0].path : defaultPage.path
    state.userMenu = data
  },
  setRoles: (state, data) => {
    state.roles = data
  },
  setUserRights: (state, data) => {
    state.userRights = arrayTransferMap(data, 'code')
  }
}

const actions = {
  // 获取用户信息
  async getUserInfo({ commit }) {
    return new Promise((resolve) => {
      /**
       * 这里是mock数据
       * 正常情况下你应该使用API来获取当前用户信息
       */
        // 当前登录用户信息
      const userInfo = {
          'id': '1995',
          'userName': '开关'
        }
      commit('userInfo', userInfo)
      resolve()
    })
  },
  // 获取用户菜单
  getUserMenu({ commit }) {
    return new Promise((resolve) => {
      /**
       * 这里是mock数据
       * 正常情况下你应该 接口获取
       */
      const mockFlag = true
      if (mockFlag) {
        // 合并所有菜单
        const mergeAllMenus = mergeArray(configInfo.menus, configInfo.authMenus)

        // 过滤左侧菜单数据 并剔除不需要展示的菜单
        const filterAuthMenus = arrayFilter(JSON.parse(JSON.stringify(configInfo.menus)))

        // 设置当前用户 已授权/可见 菜单
        commit('setUserMenu', filterAuthMenus)

        // 当前用户是否已获取过菜单
        commit('setRoles', true)

        // 用户页面按钮权限
        commit('setUserRights', [])

        resolve(mergeAllMenus)
      }
    })
  },

  // 退出登录
  clearTokenCookie() {
    return new Promise(resolve => {
      Cookie.set('userToken', '')
      resolve()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
