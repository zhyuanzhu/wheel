<template>
  <div id="app">
    <Tree
      :data="data"
      :showCheckBox="true"
    />
  </div>
</template>

<script>
import Tree from './components/Tree.vue'

export default {
  name: 'App',
  components: {
    Tree,
  },
  data() {
    return {
      // depData: [],
      list: [
        { id: 1, name: 'child1', parentId: 0 },
        { id: 2, name: 'child2', parentId: 0 },
        { id: 6, name: 'child2_1', parentId: 2 },
        { id: 0, name: 'root', parentId: null },
        { id: 5, name: 'child1_2', parentId: 1 },
        { id: 4, name: 'child1_1', parentId: 1 },
        { id: 3, name: 'child3', parentId: 0 },
        { id: 7, name: 'child3_1', parentId: 3 },
      ]
    }
  },
  mounted() {
    this.formatTree()
  },
  computed: {
    data () {
      return [this.formatTree()]
    }
  },
  methods: {
    formatTree () {
      const map = new Map()
      const root = {}
      this.list.forEach(item => {
        if (!map.has(item.parentId)) {
          map.set(item.parentId, [])
        }
        item.expand = true
        if (item.parentId === null) {
          Object.assign(root, item)
          root.children = []
        }
        map.set(item.parentId, [...map.get(item.parentId), item])
      })

      findChild(root, root.id)
      return root
      function findChild (root, id) {
        const children = map.get(id) || [];
        root.children = children;
        if (children.length > 0) {
          children.forEach(child => {
            findChild(child, child.id)
          })
        }
      }
    },
    
  },
}
</script>

<style>

