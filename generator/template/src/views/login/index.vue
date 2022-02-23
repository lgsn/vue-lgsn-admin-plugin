<!--登录页-->
<template>
  <div class="login">

    <div class="login-overflow">
      <div class="login-banner" @mousemove="moveBanner($event)" @mouseout="clearMoveBanner($event)">
        <img src="@/assets/img/login-icon-01.png" alt="" :style="{transform: loginIcon01}">
        <img src="@/assets/img/login-icon-03.png" alt="" :style="{transform: loginIcon03}">
      </div>

      <!--登录相关-->
      <components :is="componentName" v-model="componentName" :default-phone="defaultPhone" @change="changeLoginType" />

    </div>

  </div>
</template>

<script>
import loginMethods from './loginMethods'
import { APP_NAME } from '@/config/public'
export default {
  name: 'Login',
  components: {
    loginMethods
  },
  data() {
    return {
      loginIcon01: 'translateY(-50%)',
      loginIcon03: 'translateY(-50%)',
      phone: '',
      password: '',
      componentName: 'loginMethods',
      defaultPhone: ''
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
    // 修改登录方式
    changeLoginType(value) {
      this.defaultPhone = value
    },
    // 清除
    clearMoveBanner() {
      this.loginIcon01 = 'translateY(-50%)'
      this.loginIcon03 = 'translateY(-50%)'
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
        .ant-tabs-nav-animated {
          width: 100%;
          &>div{
            width: 100%;
            .ant-tabs-tab{
              font-size: 16px;
              margin: 0 32px;
            }
          }
        }
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
      .ant-form {
        margin-top: 16px;
        font-size: 14px;
        .ant-input-prefix {
          font-size: 18px;
          color: rgba(0,0,0,.45);
        }
        .ant-input-affix-wrapper {
          .ant-input{
            padding-left: 34px;
          }
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
