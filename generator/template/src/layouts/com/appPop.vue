<!--快速切换应用-->
<template>
  <div class="app-pop">

    <Popover v-model="visible" trigger="click" placement="bottomLeft">

      <div slot="content" class="app-pop-content">
        <div class="app-center" @click="openView({linkUrl: baseAppInfo.link})">
          <img class="app-icon" :src="baseAppInfo.appIcon" alt="">
          <span class="app-logo">{{ baseAppInfo.appName }}</span>
        </div>
        <div class="content-overflow">
          <p class="app-title">我的应用</p>
          <div v-for="app in appList" :key="app.id" class="content-item" @click="openView(app)">
            <img class="app-icon" :src="app.coverUrl" alt="">
            <span>{{ app.appName }}</span>
          </div>
        </div>
      </div>

      <GIcon class="app-icon" icon="icon-shouyeyingyongzhongxin" @click="visible = !visible" />

    </Popover>

  </div>
</template>

<script>
import { Popover } from 'ant-design-vue'
import { appAll } from '../../api/public'
import { mapGetters } from 'vuex'
import { loginJump } from '@/api/public'
export default {
  name: 'AppPop',
  components: {
    Popover
  },
  data() {
    return {
      visible: false,
      appList: []
    }
  },
  computed: {
    ...mapGetters(['baseAppInfo'])
  },
  created() {
    appAll().then(res => {
      this.appList = res.data
    })
  },
  methods: {
    openView(item) {
      if (!item.linkUrl) return
      loginJump(item.linkUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-pop{
  margin-right: 16px;
  .app-icon{
    font-size: 24px;
    color: var(--titleColor);
    cursor: pointer;
    transition: all .3s;
    outline: none;
    vertical-align: middle;
    &:hover{
      transform: scale(1.1);
      font-weight: 800;
    }
  }
}
.app-pop-content{
  min-width: 260px;
  .content-overflow{
    max-height: 240px;
    overflow-y: auto;
  }
  .app-center{
    font-size: 16px;
    font-weight: 700;
    color: var(--titleColor);
    padding: 0 16px;
    border-bottom: 1px #f2f2f2 solid;
    border-top: 1px #f2f2f2 solid;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 42px;
      height: 42px;
    }
    .icon{
      font-size: 22px;
      vertical-align: sub;
      margin-right: 16px;
      color: #3d75f7;
    }
    &:hover{
      background: rgba(23, 35, 61, 0.03);
    }
  }
  .app-logo{
    font-size: 22px;
    color: #3b75f7;
    font-weight: bold;
    padding: 16px;
    text-align: center;
  }
  .app-title{
    font-size: 14px;
    font-weight: 700;
    height: 48px;
    line-height: 48px;
    padding: 0 16px;
    margin-top: 10px;
    color: var(--titleColor);
  }
  .content-item{
    min-width: 200px;
    padding: 0 16px;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: var(--titleColor);
    cursor: pointer;
    font-weight: 700;
    .app-icon {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
    &:hover{
      background: rgba(23, 35, 61, 0.03);
    }
  }
}
</style>
