import axios from 'axios'
import { message } from 'ant-design-vue'
import Router from '../router'

// 公用前缀
const baseURL = '/api'

axios.interceptors.response.use(response => {
  return response
}, () => {
  return Promise.reject()
})

// 校验返回参数
function checkResponse(response) {
  // 校验HTTP 状态
  if (response && ([200, 304, 400].includes(Number(response.status)))) {
    // 校验业务CODE
    return response.data
  }
  message.error('服务睡着了啦，快去叫醒它吧。')
  return Promise.reject()
}

const http = (method, url, data) => {
  const request = {
    method: '',
    url,
    baseURL,
    headers: { clientType: 'browser' },
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
      data: data
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
