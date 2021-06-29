<!--应用类型 公用布局-->
<template>

  <BasicLayoutInline />

</template>

<script>
/**
 * 左侧菜单模式
 */
import BasicLayoutInline from './MenuModal/BasicLayoutInline'
/**
 * 顶部固定模式
 */
// import HorizontalMenu from './MenuModal/HorizontalMenu'
export default {
  name: 'BasicLayout',
  components: {
    // BasicLayoutInline,
    BasicLayoutInline
  }
}
</script>
