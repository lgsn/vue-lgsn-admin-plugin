<!--公用底部操作栏-->
<template>

  <div class="global-footer-editor">
    <slot name="firstSlot"></slot>
    <a-button :loading="loading" size="large" type="primary" @click="() => (this.$emit('success'))">{{ okText }}</a-button>
    <slot name="customSlot"></slot>
    <a-button size="large" @click="() => (this.$emit('cancel'))">取 消</a-button>
  </div>

</template>

<script>
export default {
  name: 'GlobalFooter',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: '保 存'
    }
  }
}
</script>
