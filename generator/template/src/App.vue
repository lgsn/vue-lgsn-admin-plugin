<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.bindInputEvent()
    },
    methods: {
      bindInputEvent() {
        window.addEventListener('focusout', this.focusoutFn)
      },

      // 软键盘收起的事件处理
      focusoutFn() {
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
          window.scrollTo(0, Math.max(scrollHeight - 1, 0))
        }, 100)
      }
    }
  }
</script>

<style lang="scss">
  body,
  html {
    width: 100%;
    height: 100%;
    #app {
      width: 100%;
      display: flex;
      flex-direction: column;
      // overflow: hidden;
    }
  }
</style>
