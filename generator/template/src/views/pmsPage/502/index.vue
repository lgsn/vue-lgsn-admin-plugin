<template>
  <div class="error-view">

    <div class="error-icon">
      <img src="@/assets/img/error-404.png" alt="">
    </div>

    <div class="error-desc">
      <p>502</p>
      <span>服务器睡着了～～～ 快去叫醒它吧。</span>
      <div class="error-desc-btn">
        <el-button size="large" @click="() => { this.$router.push('/') }">返回首页</el-button>
        <el-button type="primary" size="large" @click="() => { this.$router.go(-2) }">返回上页</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Exception',
  created() {
    this.$setWebSite({ title: `502` })
  }
}
</script>

<style lang="scss" scoped>
  .error-view{
    width: 100%;
    height: 100%;
    background: rgb(240, 242, 245);
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-items: center;
    .error-icon{
      width: 60%;
      text-align: center;
      height: 320px;
    }
    .error-desc{
      height: 320px;
      p{
        font-size: 100px;
        color: #409EFF;
        font-weight: 600;
        font-family: monospace;
      }
      &>span{
        display: block;
        margin-bottom: 36px;
        font-size: 24px;
        color: var(--secondaryColor);
      }
      .error-desc-btn{
        display: flex;
        align-items: center;
      }
    }
  }
</style>
