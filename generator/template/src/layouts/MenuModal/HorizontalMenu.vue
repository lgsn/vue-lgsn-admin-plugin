<template>
  <div class="horizontal-menu">

    <div class="horizontal-head">
      <!--左上角 当前应用信息-->
      <appMenuTitle :default-router="defaultRouter" />

      <!--菜单-->
      <BasicMenu mode-type="horizontal" :collapsed="false" />

      <!--右侧操作栏-->
      <div class="horizontal-right">
        <!--用户信息-->
        <avatarCom :size="26" :info="userInfo" />
      </div>
    </div>

    <!--router-view-->
    <div class="horizontal-content">
      <router-view />
    </div>

  </div>
</template>

<script>
import appMenuTitle from '../com/appMenuTitle'
import avatarCom from '../com/avatarCom'
import BasicMenu from './BasicMenu'
import { mapGetters } from 'vuex'
export default {
  name: 'HorizontalMenu',
  components: {
    appMenuTitle,
    BasicMenu,
    avatarCom
  },
  data() {
    return {
      defaultRouter: ''
    }
  },
  computed: {
    ...mapGetters(['userMenu', 'userInfo', 'defaultPath'])
  },
  created() {
    this.defaultRouter = this.defaultPath
  }
}
</script>

<style lang="scss">
.horizontal-menu{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .horizontal-head{
    width: 100%;
    height: 50px;
    box-shadow: var(--cardShadow);
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 100;
    .logo{
      display: flex;
      align-items: center;
      padding: 16px;
      cursor: pointer;
      margin-right: 16px;
      .logo-img{
        width: 28px;
        height: 28px;
      }
      .logo-name{
        display: inline-block;
        font-weight: 600;
        color: #37414b;
        font-size: 17px;
        margin: 0 0 0 12px;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .horizontal-right{
      margin-left: auto;
      display: flex;
      align-items: center;
      padding-right: 16px;
    }
  }
  .horizontal-content{
    width: 100%;
    height: calc(100% - 50px);
    background: #f0f2f5;
  }
}
</style>
