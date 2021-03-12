/**
 * 国际化配置
 **/

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zh from './langs/zh';

Vue.use(VueI18n);

const messages = {
  zh: Object.assign(zh)
};

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh',
  messages
});
export default i18n;
