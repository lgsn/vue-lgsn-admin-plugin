<!--账号密码登录-->
<template>
  <div class="login-com">

    <a-form-model ref="loginForm" :model="loginForm" :rules="rules">

      <!--手机号-->
      <a-form-model-item prop="username">

        <a-input
          v-model="loginForm.username"
          size="large"
          class="login-input"
          placeholder="请输入账号"
          :max-length="20"
          @change="checkPhone"
          @pressEnter="() => { this.$emit('login') }"
        >
          <GIcon slot="prefix" icon="icon-wodeyongchexuanzhong" />

        </a-input>

      </a-form-model-item>

      <!--密码-->
      <a-form-model-item prop="password">
        <a-input
          v-model="loginForm.password"
          class="login-input"
          size="large"
          type="password"
          placeholder="请输入密码"
          :max-length="20"
          @pressEnter="() => { this.$emit('login') }"
        >
          <GIcon slot="prefix" icon="icon-mimadenglu" />

        </a-input>
      </a-form-model-item>

      <!--谷歌验证码-->
      <a-form-model-item prop="googleCode">
        <a-input
          v-model="loginForm.googleCode"
          class="login-input"
          size="large"
          type="password"
          placeholder="请输入Google 6 位数验证码"
          :max-length="6"
          @pressEnter="() => { this.$emit('login') }"
        >
          <GIcon slot="prefix" icon="icon-logo_google" />

        </a-input>
      </a-form-model-item>

    </a-form-model>

  </div>
</template>

<script>
import { validationPhone } from '@/utils/validationRules'
export default {
  name: 'AccountLogin',
  props: {
    value: { type: String, default: '' },
    info: { type: Array, default: () => {} },
    defaultValue: { type: Object, default: () => {} }
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        googleCode: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号' },
          { validator: this.validatorAccount, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ]
      },
      imgCodeTime: null
    }
  },
  watch: {
    'defaultValue': function() {
      this.loginForm = this.defaultValue
    }
  },
  created() {
    this.loginForm = this.defaultValue
  },
  methods: {
    // 校验账号
    checkPhone() {
      this.imgCodeTime = validationPhone(this.loginForm.username) ? new Date() : ''
    },
    // 校验表单
    validate(callback, errBack) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          callback()
        } else {
          errBack()
        }
      })
    },
    // 自定义校验规则
    validatorAccount(rule, value, callback) {
      if (!value) callback()

      if (!/^[0-9a-zA-Z]*$/.test(value)) {
        callback('请输入正确格式的账号')
      }
      callback()
    }
  }
}
</script>

<style lang="scss">
  .login-com{
    .verify-input {
      display: flex;
      align-content: center;
      .ant-input-lg {
        height: 44px;
        line-height: 44px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .img-code {
        cursor: pointer;
        width: 126px;
        min-width: 126px;
        height: 44px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border: 1px #d9d9d9 solid;
        border-left: 0;
      }
    }
  }
</style>
