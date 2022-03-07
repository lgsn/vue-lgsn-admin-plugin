<!--导航栏 标签-->
<template>
  <div class="nav-tag">
    <div class="nav-tags">
      <div
        v-for="(item, index) in tags"
        :key="index"
        class="tag-item"
        :class="{'tag-active': currentTag === item.name}"
        @click="triggerTas(item)"
      >
        <div class="tab-dividers"></div>
        <div class="tab-background"><tabSvg /></div>
        <div class="tab-content">
          <div class="tab-content-name">{{ item.name }}</div>
          <i v-if="tags.length > 1" class="el-icon-close" type="close" @click.stop="delTag(index)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tabSvg from './tabSvg'
export default {
  name: 'NavTag',
  components: {
    tabSvg
  },
  props: {
    tags: {
      type: Array,
      default: () => {
      }
    },
    currentTag: {
      type: String,
      default: ''
    }
  },
  methods: {
    triggerTas(item) {
      if (item.name === this.$route.name) return
      this.$router.push(item.path)
    },
    // 删除标签视图
    delTag(index) {
      this.$emit('delTag', index)
    }
  }
}
</script>

<style lang="scss">
  .nav-tag{
    width: calc(100% - 220px);
    position: relative;
    height: 40px;
    background: #f0f2f5;
  }
  .nav-tags {
    display: flex;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -1px;
    margin-left: 20px;
    .tag-item {
      display: inline-block;
      width: 150px;
      height: 34px;
      line-height: 34px;
      vertical-align: bottom;
      position: relative;
      font-size: 14px;
      color: #97a8be;
      cursor: pointer;
      pointer-events: none;
      transition: transform .2s ease,opacity .2s ease,-webkit-transform .2s ease;
      margin-left: -20px;
      .tab-dividers{
        position: absolute;
        z-index: 0;
        top: 10px;
        bottom: 10px;
        left: 9px;
        right: 9px;
        &:after{
          content: "";
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          opacity: 1;
          transition: opacity .2s ease;
          left: 1px;
          background-color: #a9adb0;
        }
      }
      .tab-background{
        position: absolute;
        z-index: 1;
        top: -1px;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        transition: opacity .2s ease;
        svg{
          width: 100%;
          height: 100%;
          fill: #f0f2f5;
        }
      }
      .tab-content{
        position: absolute;
        z-index: 5;
        left: 0;
        right: 0;
        height: 100%;
        display: flex;
        pointer-events: all;
        color: #999;
        .tab-content-name{
          position: absolute;
          left: 20px;
          right: 35px;
          flex: 1;
          mask-image: linear-gradient(90deg,#000,#000 calc(100% - 24px),transparent);
          overflow: hidden;
          font-weight: 600;
          white-space: nowrap;
        }
        .el-icon-close{
          position: absolute;
          right: 18px;
          top: 6px;
          padding: 4px;
          font-size: 10px;
          cursor: pointer;
          color: #97a8be;
          &:hover{
            background: #e8eaed;
            border-radius: 50%;
          }
        }
      }
      &:not(.tag-active) {
        .tab-background{
          opacity: 0;
        }
      }
      &:hover{
         z-index: 3;
        .tab-background {
          opacity: 1;
          svg{
            fill: #dee1e6;
          }
        }
      }
      &:first-child{
        .tab-dividers{
          opacity: 0;
        }
      }
    }
    .tag-active{
      z-index: 5;
      .tab-background {
        svg{
          fill: #fff;
        }
      }
      .tab-content {
        .tab-content-name{
          color: #97a8be;
        }
      }
      &:hover{
        z-index: 3;
        .tab-background {
          opacity: 1;
          svg{
            fill: #fff;
          }
        }
      }
    }
  }
</style>
