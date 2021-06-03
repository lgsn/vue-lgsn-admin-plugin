<!--图标-->
<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'GIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
