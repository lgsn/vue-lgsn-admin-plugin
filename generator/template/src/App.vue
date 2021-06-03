<template>
  <div id="app">
    <ConfigProvider :locale="locale">
      <router-view />
    </ConfigProvider>
  </div>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  components: {
    ConfigProvider
  },
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
