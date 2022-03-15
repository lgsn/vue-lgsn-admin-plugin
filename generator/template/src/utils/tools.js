/**
 * @Description:
 * @author Guan LinTao
 * @date 3:53 下午
 * 常用工具
 */
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

// 菜单数据格式转换为 路由数据格式
export function routerComponents(asyncRouterMap, routeRights, parentId) {
  const routeMap = routeRights || new Map()
  return asyncRouterMap.filter(v => v.component).map(route => {
    const item = {}
    routeMap.set(route.path, { rights: route.rights })
    if (route.component && route.rights) {
      const component = route.component
      item.path = `${route.path}`
      item.name = route.path
      if (route.component === 'layout') {
        item.component = RouteView
      } else {
        item.component = () => import(`@/${component}.vue`)
      }
      item.meta = {
        name: route.name,
        parentId: parentId || route.id
      }
    }
    if (route.children && route.children.length) {
      item.children = routerComponents(route.children, routeMap, route.id)
    }
    return item
  }).filter(v => v.path && v.name)
}

// 转换key
export function arrayToMap(data, key = 'configCode', value = 'configVal') {
  const info = {}
  if (data) {
    data.forEach(v => {
      info[v[key]] = v[value]
    })
  }
  return info
}
// 合并数组
export function mergeArray(data, newData) {
  data.forEach(v => {
    for (let i = 0; i < newData.length; i++) {
      if (v.id === newData[i].id) {
        if (newData[i].children && newData[i].children.length) {
          mergeArray(data, newData[i].children)
        }
        v.rights = true
        break
      }
    }
    if (v.children && v.children.length) {
      mergeArray(v.children, newData)
    }
  })
  return data
}

// 数组转换为 Map格式
export function arrayTransferMap(data, key = 'key', result = new Map()) {
  const info = result
  if (data) {
    data.forEach(v => {
      info.set(v[key], v)
      if (v.children && v.children.length) {
        arrayTransferMap(v.children, key, info)
      }
    })
  }
  return info
}

// 递归处理Array 返回指定条件的数据
export function arrayFilter(oldData) {
  if (!oldData || !oldData.length) return []
  const filterData = []
  oldData.forEach(v => {
    if (!v.hideMenu) {
      if (v.children && v.children.length) {
        v.children = arrayFilter(v.children)
      }
      filterData.push(v)
    }
  })
  return filterData
}

// 设置网页标题信息
export function setWebSiteConfig(info) {
  document.title = info.title
  let iconDome = document.getElementById('webIcon')
  if (!iconDome) {
    iconDome = document.createElement('link')
  }
  iconDome.type = 'image/x-icon'
  iconDome.id = 'webIcon'
  iconDome.rel = 'shortcut icon'
  iconDome.href = info.ico
  document.getElementsByTagName('head')[0].appendChild(iconDome)
}
