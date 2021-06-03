<!--价格输入框-->
<template>
  <a-input-number
    v-model="currentValue"
    :formatter="(value) => (`${value ? '￥' : ''}${value}`)"
    :disabled="disabled"
    :step="step"
    :precision="precision"
    :size="size"
    :min="min"
    :placeholder="placeholder"
    @change="handleBlur"
  />
</template>

<script>
import { formatDecimal } from '@/utils/tools'
export default {
  name: 'GPriceInput',
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    size: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
    precision: {
      type: Number,
      default: 2
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  data() {
    return {
      currentValue: ''
    }
  },
  watch: {
    value: function() {
      this.currentValue = this.value
    }
  },
  created() {
    this.currentValue = this.value
  },
  methods: {
    handleBlur(value) {
      this.$emit('input', formatDecimal(value))
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
