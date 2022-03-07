<!--登录页-->
<template>
  <div class="login">

    <div class="login-overflow">

      <div class="login-banner" @mousemove="moveBanner($event)" @mouseout="clearMoveBanner($event)">
        <img src="@/assets/img/login-icon-01.png" alt="" :style="{transform: loginIcon01}">
        <img src="@/assets/img/login-icon-03.png" alt="" :style="{transform: loginIcon03}">
      </div>

      <div class="login-model">

        <p class="global-title">{{ APP_NAME }}</p>

        <el-form ref="loginForm" :model="loginForm" :rules="rules">

          <!--手机号-->
          <el-form-item prop="username">

            <el-input
                v-model="loginForm.username"
                size="large"
                class="login-input"
                placeholder="请输入账号"
                :maxlength="20"
                @change="checkPhone"
                @pressEnter="() => { this.$emit('login') }"
            >
              <GIcon slot="prefix" icon="icon-wodeyongchexuanzhong" />

            </el-input>

          </el-form-item>

          <!--密码-->
          <el-form-item prop="password">
            <el-input
                v-model="loginForm.password"
                class="login-input"
                size="large"
                type="password"
                placeholder="请输入密码"
                :maxlength="20"
                @pressEnter="() => { this.$emit('login') }"
            >
              <GIcon slot="prefix" icon="icon-mimadenglu" />

            </el-input>
          </el-form-item>

          <!--谷歌验证码-->
          <el-form-item prop="googleCode">
            <el-input
                v-model="loginForm.googleCode"
                class="login-input"
                size="large"
                type="password"
                placeholder="请输入Google 6 位数验证码"
                :maxlength="6"
                @pressEnter="() => { this.$emit('login') }"
            >
              <GIcon slot="prefix" icon="icon-logo_google" />

            </el-input>
          </el-form-item>

        </el-form>

        <el-button class="login-button" :loading="loading" type="primary" @click="login">立即登录</el-button>

      </div>

    </div>

  </div>
</template>

<script>
  import { validationPhone } from '@/utils/validationRules'
  import { APP_NAME } from '@/config/public'
  import Cookie from 'js-cookie'
  export default {
    name: 'Login',
    data() {
      return {
        APP_NAME,
        loginIcon01: 'translateY(-50%)',
        loginIcon03: 'translateY(-50%)',
        componentName: 'loginMethods',
        loginForm: {
          username: '',
          password: '',
          googleCode: ''
        },
        loading: false,
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
    created() {
      this.$setWebSite({ title: APP_NAME })
    },
    methods: {
      // 移动背景图
      moveBanner(e) {
        let i = 0.003
        let a = Math.floor((500 - e.clientY) * i)
        let o = Math.floor((window.innerWidth - e.clientX) * i)
        this.loginIcon01 = `translate(${o}%, ${-50 + a}%)`
        i = 0.003 + 1 / 900
        a = Math.floor((500 - e.clientY) * i)
        o = Math.floor((window.innerWidth - e.clientX) * i)
        this.loginIcon03 = `translate(${o}%, ${-50 + a}%)`
      },
      // 清除
      clearMoveBanner() {
        this.loginIcon01 = 'translateY(-50%)'
        this.loginIcon03 = 'translateY(-50%)'
      },
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
      },
      login() {
        this.$refs.loginForm.validate(valida => {
          if (valida) {
            this.loading = true
            setTimeout(() => {
              this.loading = false
              Cookie.set('userToken', '******')
              this.$router.push('/')
            }, 1000)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .login{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-image: linear-gradient(to left top, #088eef, #2437c1);
    position: relative;

    .login-overflow{
      min-height: 400px;
      .custom-tabs{
        font-size: 16px;
      }
      .login-assist {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .forget-pwd {
          padding-right: 0;
        }
      }
    }

    .login-banner{

      & > img{
        width: 702px;
        height: auto;
        position: absolute;
        left: 10%;
        top: 50%;
        transform: translateY(-50%);
        transition: all .7s ease-out;
      }
    }

    .login-model{
      width: 360px;
      padding: 16px;
      background: #FFF;
      border-radius: 4px;
      position: absolute;
      right: 20%;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: var(--cardShadow);
      .el-form {
        margin-top: 16px;
        font-size: 14px;
        .el-input__prefix {
          font-size: 16px;
          line-height: 44px;
          padding-left: 5px;
        }
      }
      .login-input {
        input {
          height: 44px;
          line-height: 44px;
        }
      }
      .login-button {
        width: 100%;
        height: 44px;
        line-height: 44px;
        padding: 0;
        margin-top: 20px;
        font-size: 14px;
        letter-spacing: 1px;
        background: #1890ff;
      }
    }

    .login-footer{
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      text-align: center;
      color: #fff;
      & > a {
        color: #ffffff;
        & > img {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 4px;
          vertical-align: sub;
        }
      }
    }
  }
</style>
