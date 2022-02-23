<!--登录方式-->
<template>

  <div class="login-model">

    <p class="global-title">{{ APP_NAME }}</p>

    <components :is="componentName" ref="loginComponents" v-model="componentName" :default-value="defaultValue" @login="login" />

    <a-button class="login-button" :loading="loading" type="primary" @click="login">立即登录</a-button>
  </div>

</template>

<script>
import accountLogin from './accountLogin'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import { APP_NAME } from '@/config/public'
export default {
  name: 'LoginMethods',
  components: {
    accountLogin
  },
  data() {
    return {
      APP_NAME,
      defaultValue: {},
      componentName: 'accountLogin',
      logTypeMap: {
        accountPwd: 'accountLogin',
        smsCode: 'smsLogin',
        forget: 'forget'
      },
      rememberPaw: false,
      loading: false
    }
  },
  created() {
    this.decryptAccount()
  },
  methods: {
    // 解密账号
    decryptAccount() {
      const defaultAccount = Cookies.get('userToken')
      if (defaultAccount) {
        const account = CryptoJS.AES.decrypt(defaultAccount, 'userToken').toString(CryptoJS.enc.Utf8)
        const decryptValue = account.split('$')
        const rememberPawFlag = decryptValue.length === 3 ? decryptValue[2] : decryptValue[1]
        if (rememberPawFlag) {
          this.defaultValue = {
            phone: decryptValue[0],
            password: decryptValue.length === 3 ? decryptValue[1] : ''
          }
          this.rememberPaw = Boolean(rememberPawFlag)
        }
      }
    },
    // 登录
    login() {
      this.loading = true
      this.$refs.loginComponents.validate(() => {
        this.loading = false
        Cookies.set('userToken', '12312312313')
        this.$router.push({ path: '/' })
      }, () => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
