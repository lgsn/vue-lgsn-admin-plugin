<!--短信验证码-->
<template>
  <div class="g-sms-code">
    <a-button v-if="!showCountdown" :loading="codeLoad" :disabled="!isDisabled" size="large" type="primary" @click="getCode">获取验证码</a-button>
    <a-button v-else disabled size="large" type="primary">{{ times }}s</a-button>
  </div>
</template>

<script>
export default {
  name: 'GSmsCode',
  props: {
    isDisabled: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      codeLoad: false,
      showCountdown: false,
      countDownFn: null,
      times: 0
    }
  },
  beforeDestroy() {
    this.clearCountdown()
  },
  methods: {
    getCode() {
      this.codeLoad = true
      this.$emit('getCode', {
        closeLoad: () => (this.codeLoad = false),
        success: () => this.countDown()
      })
    },
    // 倒计时
    countDown() {
      this.times = 60
      this.showCountdown = true
      this.countDownFn = setInterval(() => {
        if (this.times < 1) {
          this.clearCountdown()
          return
        }
        this.times -= 1
      }, 1000)
    },
    // 清除倒计时
    clearCountdown() {
      clearInterval(this.countDownFn)
      this.countDownFn = false
      this.showCountdown = false
      this.times = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .g-sms-code{
    width: 40%;
    ::v-deep .ant-btn {
      font-size: 14px;
      width: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
      cursor: pointer;
    }
  }
</style>
