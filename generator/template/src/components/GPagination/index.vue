<!--分页-->
<template>
  <el-pagination
    :page-sizes="[10, 20, 40, 80, 100]"
    :current-page.sync="page"
    :page-size.sync="pageSize"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="changePageSize"
    @current-change="changePage"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'GPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    }
  },
  computed: {
    page: {
      get() {
        return this.currentPage
      },
      set(value) {
        this.$emit('update:currentPage', value)
      }
    },
    pageSize: {
      get() {
        return this.size
      },
      set(value) {
        this.$emit('update:size', value)
      }
    }
  },
  methods: {
    // 修改页码数量
    changePageSize(size) {
      this.$emit('change', { page: this.page, size: size })
    },
    // 修改页码
    changePage(page) {
      this.$emit('change', { page: page, size: this.size })
    }
  }
}
</script>

<style lang="scss">

</style>
