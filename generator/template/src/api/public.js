/**
 * @Description:
 * @author Guan LinTao
 * @date 5:31 下午
 * 公用接口
 */

import http from '../utils/axios'
import CryptoJS from 'crypto-js'

// 获取模块对应的系统配置
export const zeusConfig = params => http('GET', '/zeus/config/list', params)

// 获取当前用户信息
export const userInfo = params => http('GET', '/sso/user/info', params)

// 获取用户所在应用权限
export const getUserAuth = params => http('GET', '/hera/auth/getAuth', params)

// 上传文件
export const uploadFileSrc = '/api/file/image/upload?bizCode=sso'

// 获取当前登录人在当前企业下可访问的所有应用信息
export const appAll = params => http('GET', '/gaea/app/all', params)

// 退出登录
export const logout = () => {
  location.href = `/api/sso/login/logout?service=${CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(location.href))}`
}

// 登录跳转
export const loginJump = sourceUrl => {
  const url = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(sourceUrl))
  location.href = `/api/sso/auth/jump?service=${CryptoJS.enc.Base64.parse(url).toString(CryptoJS.enc.Utf8)}`
}

// 修改密码
export const updatePwd = params => http('POST', '/sso/user/updatePwd', params)
