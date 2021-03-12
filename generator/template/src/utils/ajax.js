import axios from 'axios';
import { nativeAppFun, getStorage } from './utils';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 30000;
axios.interceptors.request.use(config => config, error => Promise.reject(error));
axios.interceptors.response.use(resp => resp, error => Promise.reject(error));
// eslint-disable-next-line no-unused-vars
const userInfo = getStorage('userInfo') || {};
const time = new Date().getTime();
export default {
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        headers: {
          systemData: JSON.stringify({
            // reqId: window.dataModel?.reqId || '',
            // appVersion: window.dataModel?.appVersion || '',
            // osType: window.dataModel?.osType || '',
            // osVersion: window.dataModel?.osVersion || '',
            // deviceType: window.dataModel?.deviceType || '',
            // deviceId: window.dataModel?.deviceId || '',
            // netType: window.dataModel?.netType || '',
            // wifiName: window.dataModel?.wifiName || '',
            // appLanguage: window.dataModel?.appLanguage || '',
            // timestamp: time,
            // clientIp: window.dataModel?.clientIp || '',
            // region: window.dataModel?.region || '',
            // appCode: window.dataModel?.appCode || '',
            // channelCode: window.dataModel?.channelCode || '',
            // token: window.dataModel?.token || '',
            // authCode: window.dataModel?.authCode || ''
            reqId: '1',
            appVersion: '1.0.0',
            osType: 'ios',
            osVersion: '28',
            deviceType: 'IPhone 11',
            deviceId: '222',
            netType: 'wifi',
            wifiName: '',
            appLanguage: 'English',
            timestamp: time,
            clientIp: '',
            region: '',
            appCode: '111',
            channelCode: '0',
            // token: 'T8yHU/4ttTKnecxJQI5y005sGFVxj+1+HhxvJxo5KFkcDSEnOK+ZIZ4ZTTahlH4pxhc/qBlqWSkv2RYiMQR+3w==',
            token: userInfo.accessToken || 'DT/gg5hs/68H/GE7roYaYouB6lCCUn8erxnL8FRnjbidp8+sGNIN17CR3cw1uAwLWE0423AQow0q7hyqEPU3PA\u003d\u003d',
            authCode: ''
          })
        }
      }).then((res) => {
        if (!res) {
          // eslint-disable-next-line no-console
          console.error(`The request url: ${url} load fail.`);
        }
        const { data } = res || {};
        if (data.code === '000') { // 接口成功
          resolve(data);
        } else if (data.code === '100' && data.subCode) { // 接口失败并且需要特殊处理的
          resolve(data);
        } else if (['102'].indexOf(`${data.code}`) >= 0) { // 登录失效
          setTimeout(() => {
            nativeAppFun('IT_loginOut', { toast: 'Login failed. Please login again' }, '');// 退出登录
          }, 500);
        } else {
          reject(res);
        }
      }, err => reject(err));
    });
  },
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        data: params
      }, {
        headers: { token: window.dataModel.token || '' }
      }).then(response => resolve(response.data), err => reject(err));
    });
  }
};
