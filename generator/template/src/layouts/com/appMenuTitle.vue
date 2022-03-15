<template>
  <!--左侧顶部 logo 标题-->
  <div class="logo" @click="() => { $router.push(defaultRouter) }">
    <img v-if="APP_LOGO" class="logo-img" alt="返回应用中心" :src="APP_LOGO">
    <p v-if="!collapsed" class="logo-name">{{ APP_NAME }}</p>
  </div>
</template>

<script>
  import { APP_NAME, APP_LOGO } from '@/config/public'
  export default {
    name: 'AppMenuTitle',
    props: {
      defaultRouter: {
        type: String,
        default: ''
      },
      collapsed: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        APP_NAME,
        APP_LOGO
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo-img{
    object-fit: scale-down;
  }
</style>
