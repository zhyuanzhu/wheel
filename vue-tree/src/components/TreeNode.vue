<template>
  <ul class="items">
    <li class="item">
      <input
        class="checkbox"
        type="checkbox"
        v-if="showCheckBox"
        :value="data.checked"
        @input="handleCheck"
      />
      <span>{{ data.name }}</span>
      <span class="tree-expand">{{ expandTxt }}</span>
      <!-- 此处递归子元素 -->
      <tree-node
        v-show="data.expand"
        :showCheckBox="showCheckBox"
        v-for="(item, index) in data.children"
        :key="index"
        :data="item"
        @handleCheck="handleChildCheck"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    showCheckBox: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    expandTxt () {
      // return this.data.expand ? '关闭' : '打开'
      return ''
    }
  },
  methods: {
    handleCheck (e) {
      const isChecked = e.target.checked
      this.$emit('handleCheck', isChecked)
    },
    handleChildCheck (v) {
      this.$emit('handleCheck', v)
    }
  }
}
</script>

<style>
  .items,
  .item {
    font-size: 20px;
    list-style: none;
    margin-left: 10px;
    position: relative;
    height: auto;
  }
  .items {
    margin: 0 auto;
    box-sizing: border-box;
  }
  .item {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    margin: 6px 3px;
    padding-right: 3px;
    padding-left: 10px;
  }
  .tree-expand {
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: 4px;
    right: 0;
    margin: auto;
  }
  .checkbox {
    display: inline-block!important;
    vertical-align: middle;
    margin-right: 4px;
  }
  .tree-loading {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 0;
    margin: auto;
  }
</style>