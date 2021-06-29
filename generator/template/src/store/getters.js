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
  routeRightsMap: state => state.permissionStore.routeRightsMap
}
