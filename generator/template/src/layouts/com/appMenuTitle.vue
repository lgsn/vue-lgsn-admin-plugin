<template>
  <!--左侧顶部 logo 标题-->
  <div class="logo" @click="() => { $router.push(defaultRouter) }">
    <img v-if="appInfo.iconUrl" class="logo-img" alt="返回应用中心" :src="appInfo.iconUrl">
    <p v-if="!collapsed" class="logo-name">{{ appInfo.appName }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'appMenuTitle',
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
  computed: {
    ...mapGetters(['appInfo'])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$setWebSite({
        title: this.appInfo.tabTitle,
        ico: this.appInfo.tabIcon
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo-img{
  object-fit: scale-down;
}
</style>
