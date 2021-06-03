<!--应用类型 公用导航-->
<template>
  <div class="basic-menu">

    <a-menu v-model="menus" class="menu-item" theme="dark" mode="inline" :inline-collapsed="collapsed" :default-open-keys="defaultOpenKeys" @select="openView">

      <template v-for="menu in userMenu">

        <!--一级菜单-->
        <a-menu-item v-if="!menu.children || !menu.children.length" :key="menu.id">
          <GIcon class="menu-icon anticon" :icon="menu.icon" />
          <span>{{ menu.name }}</span>
        </a-menu-item>

        <!--包含子菜单-->
        <a-sub-menu v-else :key="menu.id">

          <template slot="title">
            <GIcon class="menu-icon anticon" :icon="menu.icon" />
            <span>{{ menu.name }}</span>
          </template>

          <a-menu-item v-for="menuChildren in menu.children" :key="menuChildren.link">
            {{ menuChildren.name }}
          </a-menu-item>

        </a-sub-menu>

      </template>

    </a-menu>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BasicMenu',
  props: {
    collapsed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      menus: [],
      defaultOpenKeys: []
    }
  },
  computed: {
    ...mapGetters(['userMenu', 'routeRightsMap'])
  },
  watch: {
    $route() {
      this.menus = [this.$route.name]
    }
  },
  created() {
    this.menus = [this.$route.name]
    this.defaultOpenKeys = [this.$route.meta.parentId]
  },
  methods: {
    openView({ key }) {
      if (key === this.$route.name) return
      this.$router.replace({ name: key })
    }
  }
}
</script>

<style lang="scss">
.basic-menu{
  flex: 1 1 0;
  overflow: hidden auto;
  .menu-item{
    .menu-icon{
      margin-right: 10px;
      font-size: 16px;
      color: #fff;
    }
  }
  .ant-menu-inline-collapsed{
    .menu-icon{
      font-size: 20px;
    }
  }
}
</style>
