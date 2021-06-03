/**
 * @Description:
 * @author Guan LinTao
 * @date 8:22 下午
 * 统一暴露getters
 */

export default {
  userMenu: state => state.userStore.userMenu,
  appInfo: state => state.userStore.appInfo,
  baseAppInfo: state => state.userStore.baseAppInfo,
  userRights: state => state.userStore.userRights,
  cityData: state => state.baseConfigStore.cityData,
  routeRightsMap: state => state.permissionStore.routeRightsMap
}
