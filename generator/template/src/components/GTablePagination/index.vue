<!--表格页面中的分页-->
<template>
  <div class="g-table-pagination">

    <span class="total">共 <b>{{ total }}</b> 条记录</span>

    <Pagination
      :current="currentPage"
      :page-size-options="['20', '50', '100', '200']"
      show-size-changer
      :page-size="pageSize"
      :total="total"
      @change="changePage"
      @showSizeChange="showSizeChange"
    />

  </div>
</template>

<script>
import { Pagination } from 'ant-design-vue'
export default {
  name: 'GTablePagination',
  components: {
    Pagination
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20
    }
  },
  watch: {
    value: function() {
      this.currentPage = this.value
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page
      this.update()
    },
    showSizeChange(current, size) {
      this.pageSize = size
      this.update()
    },
    update() {
      this.$emit('changePage', {
        page: this.currentPage,
        size: this.pageSize
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.g-table-pagination{
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 48px;
  line-height: 48px;
  padding: 24px;
  background: #fff;
  box-shadow: var(--cardShadow);
  font-size: 14px;
  color: var(--titleColor);
  display: flex;
  align-items: center;
  .total{
    color: var(--secondaryColor);
    b{
      color: var(--titleColor);
      font-weight: normal;
    }
  }
  .ant-pagination{
    margin-left: auto;
  }
  ::v-deep .ant-pagination-item-active a{
    background: #1890ff;
    color: #fff;
  }
}
</style>
