<!--树-->
<template>
  <div class="g-tree">
    <GTreeNode
      :tree-node="treeNode"
      :active-node="activeNode"
      @selectNode="selectNode"
    />
  </div>
</template>

<script>
import GTreeNode from './GTreeNode'
export default {
  name: 'GTree',
  components: {
    GTreeNode
  },
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    defaultSelectedKeys: {
      type: [String, Number],
      default: ''
    },
    defaultExpandedKeys: {
      type: Array,
      default: () => {}
    },
    replaceFields: {
      type: Object,
      default: () => ({
        key: 'value',
        value: 'value',
        label: 'label',
        children: 'children'
      })
    }
  },
  data() {
    return {
      treeNode: [],
      activeNode: undefined
    }
  },
  watch: {
    'treeData': function() {
      this.treeNode = this.updateTreeData(this.treeData)
    }
  },
  created() {
    this.activeNode = this.defaultSelectedKeys
    this.treeNode = this.updateTreeData(this.treeData)
  },
  methods: {
    updateTreeData(data) {
      const defaultField = this.replaceFields
      return data.map(v => {
        v.extend = this.defaultExpandedKeys.includes(v[defaultField.value])
        const children = v[defaultField.children] ? this.updateTreeData(v[defaultField.children]) : []
        return {
          ...v,
          key: v[defaultField.key],
          value: v[defaultField.value],
          label: v[defaultField.label],
          extend: v.extend || children.filter(v => v.extend).length > 0,
          children
        }
      })
    },
    selectNode(node) {
      this.activeNode = node.value
      const defaultField = this.replaceFields
      this.$emit('select', {
        ...node,
        [defaultField.key]: node.key,
        [defaultField.value]: node.value,
        [defaultField.label]: node.label
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .g-tree{

  }
</style>
