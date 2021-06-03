<template>
  <ul class="g-tree-node">
    <li
      v-for="node in treeNode"
      :key="node.key"
      :node="node"
      :class="{'open-arrow-icon': node.extend, 'tree-node-selected': activeNode === node.value }"
    >
      <GIcon
        v-if="node.children && node.children.length"
        class="arrow-icon"
        :icon="node.extend ? 'icon-zhankai2' : 'icon-zhankai1'"
        @click.native="node.extend = !node.extend"
      />
      <span v-else class="norma-children" />
      <span
        class="node-title"
        @click.stop="selectNode(node)"
        @dblclick.stop="node.extend = !node.extend"
      >{{ node.label }}</span>
      <template v-if="node.children && node.children.length">
        <div v-show="node.extend">
          <GTreeNode
            :tree-node="node.children"
            :active-node="activeNode"
            @selectNode="selectedNode => selectNode(selectedNode)"
          />
        </div>
      </template>
    </li>
  </ul>
</template>

<script>
import GIcon from '@/components/GIcon'
export default {
  name: 'GTreeNode',
  components: {
    GIcon
  },
  props: {
    treeNode: {
      type: Array,
      default: () => {}
    },
    activeNode: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      clickTime: null
    }
  },
  methods: {
    selectNode(node) {
      this.$emit('selectNode', node)
    }
  }
}
</script>

<style lang="scss" scoped>
.g-tree-node{
  ul{
    padding-left: 18px;
    li{
      &:before{
        content: '';
        position: absolute;
        left: 6px;
        top: 0;
        width: 1px;
        height: 100%;
        border-left: 1px solid #d9d9d9;
      }
      &:last-child{
        &:before{
          content: '';
          position: absolute;
          left: 6px;
          top: 0;
          width: 1px;
          height: 61%;
          border-left: 1px solid #d9d9d9;
        }
      }
    }
  }
  li{
    cursor: pointer;
    padding: 7px 0 4px 0;
    position: relative;
    box-sizing: border-box;
    outline: none;
    user-select: none;
    width: auto;
  }
  .arrow-icon{
    font-size: 14px;
    color: rgba(0, 0, 0, .45);
    margin-right: 4px;
    background: #fff;
    position: relative;
    transition: all .3s;
    transform: rotate(180deg);
  }
  .open-arrow-icon{
    transform: rotate(0deg);
  }
  .node-title{
    display: inline-block;
    font-size: 14px;
    min-width: calc(100% - 24px);
    padding: 0 5px;
    height: 24px;
    line-height: 24px;
  }
  .tree-node-selected{
    &>.node-title{
      min-width: calc(100% - 24px);
      background: #1890ff;
      color: #fff;
    }
    &>.arrow-icon{
      color: #409EFF;
    }
  }
  .norma-children{
    display: inline-block;
    width: 14px;
    height: 1px;
    vertical-align: middle;
    background: #d9d9d9;
    margin-left: 7px;
  }
}
</style>
