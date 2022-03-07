<!--头像-->
<template>
  <div class="avatar-com">

    <Popover trigger="click" @show="visible = true" @after-leave="visible = false">
      <div class="avatar-popover-content">
        <div class="avatar-com-header">
          <GUploadImg v-model="info.headImg" :read-only="true" :border="true" class="avatar-com-header-img" :size="36" :font-size="18" :avatar-text="info.userName" @click="visible = true" />
          <span class="user-name">{{ info.userName }}</span>
        </div>
        <ul>
          <li @click="() => { isEditorPwd = true; close() }">
            <GIcon icon="icon-bianji"></GIcon>
            <span>修改密码</span>
          </li>
          <li @click="logOut">
            <GIcon icon="icon-tuichu"></GIcon>
            <span>退出登录</span>
          </li>
        </ul>
      </div>

      <div slot="reference" class="shw-avatar">
        <GUploadImg v-model="info.headImg" :read-only="true" :border="true" :avatar-text="info.userName" :font-size="18" :size="size" class="avatar-com-img" @click="visible = true" />
        <span class="user-name">{{ info.userName }}</span>
        <GIcon class="show-avatar-icon" :icon="visible ? 'icon-xiajiantou' : 'icon-shangjiantou'" />
      </div>

    </Popover>

    <!--修改密码-->
    <editorPwd v-model="isEditorPwd" />

  </div>
</template>

<script>
  import { Popover } from 'element-ui'
  import GUploadImg from '@/components/GUploadImg'
  import editorPwd from './editorPwd'
  export default {
    name: 'AvatarCom',
    components: {
      Popover,
      GUploadImg,
      editorPwd
    },
    props: {
      info: {
        type: Object,
        default: () => {}
      },
      size: {
        type: Number,
        default: 36
      }
    },
    data() {
      return {
        isEditorPwd: false,
        visible: false
      }
    },
    methods: {
      // 退出登录
      logOut() {
        this.$store.dispatch('clearTokenCookie').then(() => {
          this.$router.replace({ path: '/login' })
        })
      },

      close() {
        this.visible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-com-img{
    transition: all .3s;
    height: inherit;
    &:hover{
      transform: scale(1.1);
    }
  }
  .avatar-com{
    height: 100%;
    margin-left: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .shw-avatar{
      display: flex;
      align-items: center;
      height: inherit;
      .user-name{
        display: inline-block;
        margin-left: 8px;
        font-weight: 600;
        font-size: 14px;
        line-height: 40px;
      }
    }
    .show-avatar-icon{
      transition: all .3s;
      font-size: 13px;
      margin-left: 8px;
      color: #37414b;
    }
  }
  .avatar-popover-content {
    min-width: 200px;
    .avatar-com-header {
      padding: 0 16px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      border-bottom: solid 1px rgba(23, 35, 61, 0.1);
      cursor: pointer;
      .avatar-com-header-img {
        margin-right: 16px;
      }
      .user-name{
        font-size: 16px;
        font-weight: 600;
        height: 63px;
        line-height: 68px;
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: var(--titleColor);
      }
    }
    ul{
      font-size: 14px;
      cursor: pointer;
      width: 100%;
      li {
        height: 48px;
        line-height: 48px;
        display: flex;
        align-items: center;
        color: rgba(23, 35, 61, 0.75);
        span {
        }
        & > .icon{
          width: 68px;
          font-size: 20px;
          color: #909194;
        }
        &:hover{
          background: rgba(23, 35, 61, 0.03);
        }
      }
    }
  }
</style>
