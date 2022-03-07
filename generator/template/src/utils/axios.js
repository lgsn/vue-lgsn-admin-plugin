import axios from 'axios'
import { Message } from 'element-ui'
import Router from '../router'
import store from '@/store'

// 公用前缀
const baseURL = '/'

axios.interceptors.response.use(response => {
  return response
}, () => {
  return Promise.reject()
})

// 校验返回参数
function checkResponse(response) {
  // 校验HTTP 状态
  if (response && ([200, 304, 400].includes(Number(response.status)))) {
    const code = response.data.code
    if (code === '000') {
      return response.data
    } else if (code === '102') {
      Message.error('登录失效, 请重新登录')
      store.dispatch('clearTokenCookie').then(() => {
        Router.replace({ path: '/login' })
      })
      return Promise.reject(response.data)
    } else if (code === '10001') {
      Message.error('账户已禁用')
      store.dispatch('clearTokenCookie').then(() => {
        Router.replace({ path: '/login' })
      })
      return Promise.reject(response.data)
    } else if (response.data instanceof Blob) {
      return response
    } else {
      Message.error(response.data.msg)
      return Promise.reject(response.data)
    }
    // 校验业务CODE
  } else {
    Message.error('服务睡着了啦，快去叫醒它吧。')
    return Promise.reject()
  }
}

const http = (method, url, data, header, config) => {
  const request = {
    method: '',
    url,
    baseURL,
    headers: {
      ...header
    },
    timeout: 60000
  }
  if (method === 'GET') {
    return axios({
      ...request,
      method: 'get',
      params: data
    }).then(response => (checkResponse(response))).catch(res => {
      if (res === undefined) {
        Router.push('fault')
        throw new Error('服务器错误')
      } else {
        return Promise.reject(res)
      }
    })
  } else {
    return axios({
      ...request,
      method: 'post',
      data: data,
      ...config
    }).then(response => (checkResponse(response))).catch(res => {
      if (res === undefined) {
        Router.push('fault')
        throw new Error('服务器错误')
      } else {
        return Promise.reject(res)
      }
    })
  }
}

export default http
