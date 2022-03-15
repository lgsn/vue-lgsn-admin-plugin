/**
 * @Description:
 * @author Guan LinTao
 * @date 8:22 下午
 * 统一暴露getters
 */

export default {
  userMenu: state => state.userStore.userMenu,
  defaultPath: state => state.userStore.defaultPath,
  userRights: state => state.userStore.userRights,
  routeRightsMap: state => state.permissionStore.routeRightsMap
}
