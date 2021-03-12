<!-- 登录 -->
<template>

  <div class="login">

    <div class="item2">
      <img class="img1" src="@/assets/img/loginPhone.png" alt="">
      <span>
        <input class="input1" type="tel" placeholder="请输入手机号" v-model="telValue"  @input="telInput">
      </span>
    </div>

    <div class="item3" v-show="showItcode">

      <img class="img1" src="@/assets/img/loginEmail.png" alt="">
      <div class="codeWrap">
        <input class="code" type="tel" placeholder="请输入验证码" v-model="shotMsgCodeValue" @input="shotMsgCodeInput">
        <input class="btn" type="button" :value="isOnceSend" v-show="isGetCode" @click="openGraphCode">
        <input class="btn active" type="button" :value="+count + 's'" v-show="!isGetCode">
      </div>
    </div>

    <div class="item5">
      <button class="btn" ref="btn" :disabled="disabledStatus" @click="userLogin">登录/注册</button>
    </div>

    <div class="item6">
      <van-checkbox @change="changeBox" v-model="checked" checked-color="#F3912B"></van-checkbox>
      <div class="item6_child">
        请确认已阅读并同意<span @click="jumpClick(1)">《用户服务协议》</span>和<span @click="jumpClick(2)">《隐私协议》</span>，未注册时将自动注册账号
      </div>
    </div>

    <!-- 图形验证码弹框 -->
    <verificationCode v-if="isShowCodeBox" :mobile="telValue" @callBack="verificationCall"></verificationCode>

    <!-- vanLoading -->
    <van-loading v-show="showVanLoading"></van-loading>

  </div>
</template>

<script>
  import vanLoading from '@/components/vanLoading/index.vue'
  import verificationCode from '@/components/verificationCode/index.vue'
  import Md5 from 'js-md5'
  import { Checkbox } from 'vant'

  export default {
    name: 'Login',
    components: {
      vanLoading,
      VanCheckbox: Checkbox,
      verificationCode
    },
    data() {
      return {
        checked: true, // 是否勾选协议
        isInviteCode: true, // 是否显示输入邀请码
        codeValue: '', // 邀请码的值
        showVanLoading: false,
        isGetCode: true, // 是否显示短信验证码按钮
        count: 60, // 倒计时
        countDown: 60, // 倒计时60s
        isOnceSend: '获取验证码', // 是否第一次发送图形验证码
        showItcode: true, // 是否显示验证码框
        isShowCodeBox: false, // 是否显示图形验证码弹窗
        telValue: '', // 手机号码输入值
        shotMsgCodeValue: '', // 短信验证码输入值
        loginStatus: 1, // 登录状态
        type: 2, // 登录类型  1密码 2验证码
        disabledStatus: true,
        pwdSmsValue: '', // 上传的值
        imgCodeValue: ''
      };
    },
    methods: {

      // 登录/注册
      userLogin() {

        this.showVanLoading = true;

        const time = new Date().getTime();

        this.$ajax.post('/api/h5/userLogin/loginRegister/v1', {
          mobile: this.telValue || '',
          verifyCode: this.shotMsgCodeValue,
          appSign: Md5(`mobile=${this.telValue}&timeStamp=${time}&f635b53f2216eefb4e3a65b0d742ec70`),
          timeStamp: time
        }).then(responseData => {
          const { code, msg, data } = responseData
          if (code === '100') {
            this.$Utils.alertMsg(msg)
          } else {
            this.$Utils.setStorage('userInfo', data);

            //TODO 手动跳转
            // setTimeout(() => {
            //   this.$router.push({
            //     name: 'aboutUs'
            //   })
            // }, 1000)
          }
          this.showVanLoading = false;
        }).catch((err) => {
          this.showVanLoading = false;
          this.$Utils.alertMsg(err.data.msg || '服务器异常，请稍后再试');
        });

      },

      // 打开图形验证码
      openGraphCode() {
        // 非空验证
        if (this.telValue === '') {
          this.$Utils.alertMsg('请输入手机号码');
          return;
        }
        // 11位数字验证
        if (/^1\d{10}$/.test(this.telValue)) {
          this.$Utils.alertMsg('手机号有误，请重新输入');
          return;
        }
        this.isShowCodeBox = true;
      },

      // 图形验证回调
      verificationCall(info) {
        this.isShowCodeBox = false;
        const { value, code } = info
        if (!code) {
          this.imgCodeValue = value
          this.getShotMsgCode()
        }
      },

      // 点击获取短信验证码
      getShotMsgCode() {
        this.showVanLoading = true;
        this.isOnceSend = '重新获取';
        const time = new Date().getTime()
        this.$ajax.post('/api/h5/userLogin/getVerifyCode/v1', {
          mobile: this.telValue || '',
          imgCode: this.imgCodeValue,
          appSign: Md5(`mobile=${this.telValue}&timeStamp=${time}&f635b53f2216eefb4e3a65b0d742ec70`),
          timeStamp: time
        }).then((data) => {
          this.showVanLoading = false;
          if (data.code === '000') {
            this.$Utils.alertMsg('短信已发送');
            this.countDown60();
            this.isInviteCode = data.data.isOldUser;
          } else if (data.subCode) {
            this.$Utils.alertMsg(data.msg);
          } else {
            this.$Utils.alertMsg(data.msg);
          }
        }).catch((err) => {
          this.showVanLoading = false;
          this.$Utils.alertMsg(err.data.msg || '服务器异常，请稍后再试');
        });
      },

      bindInputEvent() {
        const agent = this.$Utils.userAgent();
        // 微信IOS 6.7.4 键盘弹起页面上滑，键盘收起页面不会回到原位置
        if (agent === 'weixin' && this.osFrom === 2) {
          window.addEventListener('focusout', this.focusoutFn);
        }
      },
      focusoutFn() {
        // 软键盘收起的事件处理
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      },
      // 手机号码input事件
      telInput() {
        this.telValue = this.telValue.replace(/[^\d]/g, '');
        this.telValue = this.telValue.slice(0, 11);
        this.pwdInuptVal();
      },
      // 短信验证码input事件
      shotMsgCodeInput() {
        this.shotMsgCodeValue = this.shotMsgCodeValue.replace(/[^\d]/g, '');
        this.shotMsgCodeValue = this.shotMsgCodeValue.slice(0, 6);
        this.pwdInuptVal();
      },

      // 倒计时60s
      countDown60() {
        this.isGetCode = false;
        this.count = this.countDown;
        const timer = setInterval(() => {
          if (this.count === 0) {
            clearInterval(timer);
            this.isGetCode = true;
            return;
          }
          this.count -= 1;
        }, 1000);
      },
      pwdInuptVal() {
        if (this.telValue.length === 10 && this.shotMsgCodeValue.length === 6 && this.checked) {
          this.$refs.btn.classList.add('active');
          this.disabledStatus = false;
        } else {
          this.$refs.btn.classList.remove('active');
          this.disabledStatus = true;
        }
      },
      jumpClick(id) {
        if (id === 1) {
          this.$router.push({ path: '/registAg' });
        } else if (id === 2) {
          this.$router.push({ path: '/privacyInfo' });
        }
      },
      changeBox() {
        this.pwdInuptVal();
      }
    },
    mounted() {
      this.bindInputEvent();
    }
  };
</script>

<style lang="scss" scoped>
  @function vw($px) {
    @return ($px / 375) * 100vw;
  }
  .login{
    background:rgba(255,255,255,1);
    background:#ffffff;
    .item2{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 0 vw(15);
      height: vw(44);
      border-bottom: vw(1) solid #F0F0F0;
      font-size:vw(18);
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:vw(44);
      margin-top: vw(50);
      .img1{
        width: vw(18);
        height: vw(21);
        margin-right: vw(16);
        flex-shrink: 0;
      }
      .input1{
        font-size: vw(18);
        height: 90%;
        &::-webkit-input-placeholder{
          font-size:vw(18);
          font-weight:400;
          color:#AAAAAA;
        }
      }
    }
    .item3{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: vw(44);
      line-height: vw(44);
      margin: 0 vw(15);
      border-bottom: vw(1) solid #F0F0F0;
      font-size:vw(18);
      margin-top: vw(50);
      .img1{
        width: vw(22);
        height: vw(22);
        margin-right: vw(14);
        flex-shrink: 0;
      }
      .item3_left{
        width: vw(62);
      }
      .codeWrap{
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .code{
          font-size: vw(18);
          background: #fff;
          width: 100%;
          height: 90%;
          &::-webkit-input-placeholder{
            font-size:vw(18);
            font-weight:400;
            color:#AAAAAA;
          }
        }
        .btn{
          width: vw(89);
          height: vw(27);
          margin-left: vw(8);
          font: initial;
          font-size: vw(14);
          color: #fff;
          background: #F3912B;
          border-radius: vw(14);
          flex-shrink: 0;
          &.active{
            color: #fff;
            background: #ccc;
          }
        }
      }
    }
    .item5{
      width: 92%;
      height: vw(44);
      margin: 0 auto;
      margin-top: vw(100);
      text-align: center;
      line-height: vw(44);
      .btn{
        width: 100%;
        height: 100%;
        background:rgba(225,225,225,1);
        border-radius:vw(22);
        border: none;
        font-size: vw(18);
        color:rgba(255,255,255,1);
        &.active{
          background:#F3912B;
          border-radius:vw(22);
          color:rgba(255,255,255,1);
        }
      }

    }
    .item6{
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      font-size:vw(12);
      color:#999999;
      line-height:vw(18);
      margin-top: vw(7);
      padding: 0 vw(15);
      .van-checkbox{
        flex-shrink: 0;
        margin-right: vw(7);
      }
      &_child{
        span{
          color: #F3912B;
        }
      }
    }
  }
</style>
