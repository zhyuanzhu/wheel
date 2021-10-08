<template>
  <div :class="prefixCls">
    <div
      :class="`${prefixCls}-node`"
      v-for="item in data"
      :key="item.id"
    >
      <TreeNode
        :data="item"
        :showCheckBox="showCheckBox"
        @handleCheck="handleCheck"
      />
    </div>
  </div>
</template>
<script>

const prefixCls = 'tree'
import TreeNode from './TreeNode.vue'

export default {
  name: 'Tree',
  components: {
    TreeNode,
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    showCheckBox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prefixCls
    }
  },
  methods: {
    handleCheck (v) {
      console.log(v)
    }
  },
}
</script>

<style>
.tree-node {
  font-size: 30px;
  width: 90%;
  margin: 0 auto;
}
</style>