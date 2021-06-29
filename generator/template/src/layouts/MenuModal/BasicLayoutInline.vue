<!--应用类型 公用布局-->
<template>
  <Layout class="basic-layout">

    <!--左侧 logo 菜单-->
    <LayoutSider v-model="collapsed" :trigger="null" collapsible class="basic-layout-sider">

      <!--左侧应用标识-->
      <appCom :default-router="defaultRouter" :collapsed="collapsed" />

      <!--菜单-->
      <BasicMenu v-model="collapsed" />

      <!--展开/缩小菜单栏-->
      <div v-if="collapsedFooter" class="basic-layout-sider-footer" @click="toggleCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </div>

    </LayoutSider>

    <!--右侧 导航 内容-->
    <Layout>

      <!--导航-->
      <LayoutHeader class="layout-head">

        <!--菜单标签栏-->
        <NavTags :current-tag="currentTag" :tags="tagViews" @delTag="delTag" />

        <!--右侧操作栏-->
        <div class="layout-head-right">
          <appPop />
          <avatarCom :size="26" :info="userInfo" />
        </div>

        <div class="layout-head-info">
          <!--展开/缩小菜单栏-->
          <a-icon class="menu-collapsed" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapsed" />

          <!--面包屑-->
          <Breadcrumb class="menu-breadcrumb">
            <BreadcrumbItem class="menu-breadcrumb-item">开关的百万小店</BreadcrumbItem>
            <BreadcrumbItem v-for="(item, index) in breadcrumbList" :key="index" class="menu-breadcrumb-item">{{ item.meta.name }}</BreadcrumbItem>
          </Breadcrumb>

        </div>

      </LayoutHeader>

      <!--内容-->
      <LayoutContent class="layout-content">

        <router-view />

      </LayoutContent>

    </Layout>

  </Layout>

</template>

<script>
import { Layout, Breadcrumb } from 'ant-design-vue'
import BasicMenu from './BasicMenu'
import NavTags from '../com/navTags'
import appCom from '../com/appCom'
import appPop from '../com/appPop'
import avatarCom from '../com/avatarCom'
import { mapGetters } from 'vuex'

export default {
  name: 'BasicLayoutInline',
  components: {
    BasicMenu: BasicMenu,
    Layout: Layout,
    LayoutSider: Layout.Sider,
    LayoutHeader: Layout.Header,
    LayoutContent: Layout.Content,
    avatarCom,
    appPop,
    appCom,
    Breadcrumb,
    BreadcrumbItem: Breadcrumb.Item,
    NavTags
  },
  data() {
    return {
      collapsed: false,
      collapsedFooter: false,
      breadcrumbList: [],
      tagViews: [],
      currentTag: '',
      defaultRouter: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userMenu'])
  },
  watch: {
    $route(route) {
      this.initTag()
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.initBreadcrumb()
    }
  },
  created() {
    const defaultRouterView = this.userMenu[0]
    this.defaultRouter = defaultRouterView.children.length ? defaultRouterView.children[0].link : defaultRouterView.link
    this.initBreadcrumb()
    this.initTag()
  },
  methods: {
    // 初始化面包屑导航
    initBreadcrumb() {
      this.defaultRouter = this.$route.matched[0].path
      this.breadcrumbList = this.$route.matched.filter(v => v.meta && v.meta.name)
    },
    // 初始化历史标签
    initTag() {
      const allView = this.$route
      if (!allView.meta || !allView.meta.name) return
      if (this.tagViews.some(v => v.path === allView.path)) {
        this.currentTag = allView.meta.name
        return
      }
      this.tagViews.push(
        Object.assign({}, allView, {
          name: allView.meta.name || 'no-name'
        })
      )
      this.currentTag = allView.meta.name
    },
    // 展开/收缩菜单
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    // 删除标签视图
    delTag(index) {
      this.tagViews.splice(index, 1)
      if (this.tagViews.length) {
        this.$router.push(this.tagViews[this.tagViews.length - 1].path)
      }
    }
  }
}
</script>

<style lang="scss">
  .basic-layout{
    width: 100%;
    height: 100%;
    .basic-layout-sider{
      position: relative;
      z-index: 20;
      box-shadow: 10px 0 10px -10px #c7c7c7;
      ::v-deep .ant-layout-sider-children{
        display: flex;
        flex-direction: column;
      }
      .basic-layout-sider-footer {
        height: 48px;
        line-height: 48px;
        color: #fff;
        font-size: 16px;
        padding: 0 16px;
        cursor: pointer;
      }
    }
    .logo{
      height: 32px;
      margin: 16px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .logo-img{
        width: 32px;
        height: 32px;
        margin: 0 auto;
      }
      .logo-name{
        background: #fafafa;
        display: inline-block;
        font-weight: 600;
        color: #37414b;
        font-size: 18px;
        margin: 0 0 0 12px;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .menu-style{
      width: 100%;
      color: #fff;
    }
    .ant-layout-header{
      height: auto;
    }
    .layout-head{
      padding: 0;
      box-shadow: var(--cardShadow);
      position: relative;
      z-index: 10;
      background: #f0f2f5;
      .layout-head-info{
        height: 48px;
        display: flex;
        background: #fff;
        padding: 0;
      }
      .menu-breadcrumb{
        line-height: 48px;
        .menu-breadcrumb-item{
          color: #434343;
        }
        .menu-breadcrumb-item:last-child{
          color: #8c8c8c;
        }
      }
      .layout-head-right{
        position: absolute;
        right: 16px;
        top: 0;
        display: flex;
        align-items: center;
        height: 40px;
      }
    }
    .menu-collapsed{
      padding: 0 16px;
      font-size: 20px;
      color: var(--titleColor);
      font-weight: bold;
      cursor: pointer;
      line-height: 50px;
      &:hover{
        background-image: -webkit-gradient(linear,left top,right top,from(#ddd),to(transparent))
      }
    }
  }
</style>
