/**
 * @Description:
 * @author Guan LinTao
 * @date 3:53 下午
 * 常用工具
 */
import moment from 'moment'
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

// 脱敏手机号
export function desensitizationPhone(phone) {
  if (phone && phone.length === 11) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }
  return phone
}

// 菜单数据格式转换为 路由数据格式
export function routerComponents(asyncRouterMap, routeRights, parentId) {
  const routeMap = routeRights || new Map()
  return asyncRouterMap.filter(v => v.component).map(route => {
    const item = {}
    routeMap.set(route.link, { rights: route.rights })
    if (route.component && route.rights) {
      const component = route.component
      item.path = `${route.link}`
      item.name = route.link
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

// 处理时间格式 返回给后端
export const formatRequestTime = (data, timeKey) => {
  timeKey.forEach(v => {
    if (!data[v]) return
    data[v] = moment(data[v]).format('YYYY/MM/DD HH:mm:ss')
  })
  return data
}

// 保留两位小数 不四舍五入
export const formatDecimal = (num, decimal = 2) => {
  if (!num) return '0.00'
  if (typeof num === 'number') {
    num = num.toString()
  }
  const index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1)
  } else {
    num = num.substring(0)
  }
  const numSplice = num.split('.')
  if (numSplice.length === 1) {
    num = `${num}.00`
  } else if (num.length === 2 && num[1].length === 1) {
    num = `${num}0`
  }
  return num
}

// 防抖函数
export const debounce = (fn, delay = 1000) => {
  let timer
  return function() {
    const _that = this
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    // eslint-disable-next-line no-undef
    const _arguments = arguments
    timer = setTimeout(() => {
      timer = null
      fn.apply(_that, _arguments)
    }, delay)
  }
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
        if (newData[i].children.length) {
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

// 转换map
export function arrayTransferMap(data, key = 'key', result = new Map()) {
  /**
   * isAllValue
   */
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

// 设置网站信息
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
