<!--自定义时间选择-->
<template>
  <div class="g-ranger-picker">
    <DatePicker v-model="startTime" :placeholder="placeholder[0]" :size="size" :disabled-date="disabledDate" @change="selectStart" />
    <span class="g-ranger-picker-delimiter" />
    <DatePicker v-model="endTime" :placeholder="placeholder[1]" :size="size" :disabled-date="disabledDate" @change="selectStart" />
  </div>
</template>

<script>
import { DatePicker } from 'ant-design-vue'
import moment from 'moment'
export default {
  name: 'GRangePicker',
  components: {
    DatePicker
  },
  props: {
    value: {
      type: Array,
      default: () => {}
    },
    placeholder: {
      type: Array,
      default: () => ['开始时间', '结束时间']
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      startTime: '',
      endTime: ''
    }
  },
  watch: {
    value: function() {
      this.startTime = this.value[0]
      this.endTime = this.value[1]
    }
  },
  methods: {
    disabledDate(current) {
      return current && current > moment().endOf('day')
    },
    selectStart() {
      this.$emit('input', [this.startTime, this.endTime])
    }
  }
}
</script>

<style lang="scss" scoped>
.g-ranger-picker{
  .g-ranger-picker-delimiter{
    width: 6px;
    height: 1px;
    background: rgba(0,0,0,.45);
    display: inline-block;
    margin: 0 10px;
    vertical-align: middle;
  }
}
</style>
