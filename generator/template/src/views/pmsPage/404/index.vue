<template>
  <div class="error-view">

    <div class="error-icon">
      <img src="@/assets/img/error-404.png" alt="">
    </div>

    <div class="error-desc">
      <p>404</p>
      <span>抱歉，您查看的页面不存在～～</span>
      <div class="error-desc-btn">
        <el-button size="large" @click="() => { this.$router.push('/') }">返回首页</el-button>
        <el-button type="primary" size="large" @click="() => { this.$router.go(-2) }">返回上页</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ErrorView',
  created() {
    this.$setWebSite({ title: `404` })
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
    }
    .error-desc{
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
