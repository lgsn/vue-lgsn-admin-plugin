<!--图形验证码-->
<template>
  <div class="verification-code">

    <div class="content">
      <p class="title">请输入验证码</p>

      <div class="code">
        <input class="code-input" type="text" v-model="imgCode" />
        <img class="graph-img" :src="imgCodeUrl" alt="">
      </div>

      <div class="operating">
        <van-button @click="cancelConfirm">取 消</van-button>
        <van-button class="operating-confirm" @click="confirmCode" type="info">确 认</van-button>
      </div>

    </div>

  </div>
</template>

<script>
  import { Button } from 'vant';
  export default {
    name: 'index',
    components: {
      VanButton: Button
    },
    props: {
      mobile: String
    },
    data() {
      return {
        imgCode: '',
        imgCodeUrl: ''
      }
    },
    methods: {

      // 初始化
      init() {
        this.$ajax.post('/api/h5/userLogin/getImageCode/v1', {
          mobile: this.mobile
        }).then(res => {
          const {isNeed, image} = res
          if (isNeed) {
            this.imgCodeUrl = image
          } else {
            this.confirmCode()
          }
        }).catch(err => {
          this.$Utils.alertMsg(err.data.msg);
          this.$emit('callBack', {
            value: this.imgCode,
            error: true
          })
        })
      },

      // 确认验证码
      confirmCode() {
        this.$emit('callBack', this.imgCode)
      },

      // 关闭图形验证
      cancelConfirm() {
        this.$emit('callBack', this.imgCode)
      }
    },
    mounted() {
      this.init()
    }
  };
</script>

<style lang="scss" scoped>
  @function vw($px) {
    @return ($px / 375) * 100vw;
  }
  .verification-code{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .content{
      width: vw(268);
      background: #fff;
      border-radius: vw(10);
      padding: vw(16);
      .title{
        font-size: vw(18);
        font-weight: 400;
        color: #000000;
        line-height: vw(24);
      }
      .code{
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        margin: vw(28) 0;
        .code-input{
          width: vw(125);
          height: vw(35);
          border-radius: vw(4);
          border: 1px solid #eee;
          margin-right: vw(10);
        }
        .graph-img{
          display: block;
          width: vw(95);
          height: vw(35);
        }
      }
      .operating{
        display: flex;
        align-items: center;
        .operating-confirm{
          margin-left: vw(20);
        }
      }
    }
  }
</style>
