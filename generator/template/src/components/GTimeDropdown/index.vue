<template>
  <Dropdown>
    <a-menu slot="overlay" @click="checkTimeType">
      <a-menu-item v-for="(item, index) in timeMap" :key="index">{{ item }}</a-menu-item>
    </a-menu>
    <a-button type="primary" icon="search" @click="searchTime">搜 索</a-button>
  </Dropdown>
</template>

<script>
import { Dropdown } from 'ant-design-vue'
import moment from 'moment'
export default {
  name: 'GTimeDropdown',
  components: {
    Dropdown
  },
  props: {
    defaultValue: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timeMap: ['今天', '昨天', '本周', '上周', '本月', '上月', '本季度', '上季度', '今年', '上年'],
      currentTime: ''
    }
  },
  methods: {
    checkTimeType(value) {
      switch (value.key) {
        case 0:
          this.updateTime([moment(), moment()], value.key)
          break
        case 1:
          this.updateTime([moment().subtract(1, 'days'), moment()], value.key)
          break
        case 2:
          this.updateTime([moment().weekday(0), moment()], value.key)
          break
        case 3:
          this.updateTime([moment().weekday(-7), moment().weekday(-1)], value.key)
          break
        case 4:
          this.updateTime([moment().startOf('month'), moment()], value.key)
          break
        case 5:
          this.updateTime([moment().month(moment().month() - 1).startOf('month'), moment().month(moment().month() - 1).endOf('month')], value.key)
          break
        case 6:
          this.updateTime([moment().startOf('Q'), moment()], value.key)
          break
        case 7:
          this.updateTime([moment().quarter(moment().quarter() - 1).startOf('Q'), moment().quarter(moment().quarter() - 1).endOf('Q')], value.key)
          break
        case 8:
          this.updateTime([moment().startOf('year'), moment()], value.key)
          break
        case 9:
          this.updateTime([moment().year(moment().year() - 1).startOf('year'), moment().year(moment().year() - 1).endOf('year')], value.key)
          break
      }
    },
    updateTime(time, value) {
      this.currentTime = this.timeMap[value]
      this.$emit('changeTime', time)
    },
    searchTime() {
      this.$emit('changeTime', [])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
