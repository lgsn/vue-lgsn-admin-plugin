<!--应用类型 公用导航-->
<template>
  <div class="basic-menu">

    <Menu
        v-model="menus"
        class="menu-item"
        mode="vertical"
        :collapse="collapsed"
        :default-active="defaultActive"
        @select="openView"
    >

      <template v-for="menu in userMenu">

        <!--一级菜单-->
        <MenuItem v-if="!menu.children || !menu.children.length" :key="menu.path" :index="menu.path">
          <GIcon class="menu-icon anticon" :icon="menu.icon" />
          <span>{{ menu.name }}</span>
        </MenuItem>

        <!--包含子菜单-->
        <Submenu v-else :key="menu.id" :index="menu.path">

          <template slot="title">
            <GIcon class="menu-icon anticon" :icon="menu.icon" />
            <span>{{ menu.name }}</span>
          </template>

          <MenuItem v-for="menuChildren in menu.children" :key="menuChildren.path" :index="menuChildren.path">
            {{ menuChildren.name }}
          </MenuItem>

        </Submenu>

      </template>

    </Menu>

  </div>
</template>

<script type="jsx">
  import { Menu, MenuItem, Submenu } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    name: 'BasicMenu',
    components: {
      Menu,
      Submenu,
      MenuItem
    },
    props: {
      collapsed: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        menus: [],
        defaultActive: ''
      }
    },
    computed: {
      ...mapGetters(['userMenu'])
    },
    watch: {
      $route() {
        this.menus = [this.$route.name]
      }
    },
    created() {
      this.menus = [this.$route.name]
      this.defaultActive = this.$route.name
    },
    methods: {
      openView(index) {
        if (index === this.$route.name) return
        this.$router.replace({ path: index })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .basic-menu{
    flex: 1 1 0;
    overflow: hidden auto;
    .menu-item{
      .menu-icon{
        margin-right: 10px;
        font-size: 16px;
        color: #37414b;
        vertical-align: middle;
      }
    }
    .menu-item:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .is-active{
      background-color: #5482ee;
      color: #e7f4ff;
      .menu-icon{
        color: #e7f4ff;
      }
    }
    .el-submenu{
      background-color: #fff;
      color: #303133;
    }
    ::v-deep{
      .el-submenu__title{
        i{
          opacity: .45;
          color: #37414b;
          font-weight: bold;
        }
      }
    }
    .is-opened{
      ::v-deep{
        .el-submenu__title{
          i{
            opacity: 1;
          }
        }
      }
    }
  }
  .el-menu--popup{
    .is-active{
      background-color: #5482ee;
      color: #e7f4ff;
      .menu-icon{
        color: #fff;
      }
    }
  }
</style>
