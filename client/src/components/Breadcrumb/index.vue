<!--
 * @author: jinghan.wang
 * @LastEditors: xin.chen
 * @description: 面包屑
 * @Date: 2021-03-20 15:01:01
 * @LastEditTime: 2022-01-18 15:06:59
-->
<template>
  <div class="main-bread">
    <ks-breadcrumb separator="/">
      <ks-breadcrumb-item v-for="(item) in levelList" :key="item.meta.title" :item-id="item.path">
        <div v-if="item.path||item.redirect" class="main-inner" @click="getChange(item)">{{ item.meta.title }}</div>
        <span v-else class="main-text">{{ item.meta.title }}</span>
      </ks-breadcrumb-item>
    </ks-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: [],
      count: 0,
      arrPath: []
    }
  },
  computed: {
    permission_routes() {
      const permission = this.$store.getters.permission_routes || []
      const f = permission.filter((p) => !p.hidden && (p.alwaysShow || typeof p.alwaysShow == 'undefined'))
      permission.forEach((p) => {
        if (p.showFirstChild > 0) {
          p.children[0].parent = p.path
          f.splice(p.showFirstChild - 1, 0, p.children[0])
        }
      })
      const tree = {
        children: f
      }
      return tree
    }
  },
  watch: {
    '$route.path'() {
      this.getArr()
    }
  },
  mounted() {
    this.getArr()
  },
  methods: {
    getChange(e) {
      this.$router.push(e.path || e.redirect)
    },
    getArr() {
      this.arrPath = []
      this.count = 0
      this.deepFinds(this.permission_routes, this.$route.path)
      this.levelList = Object.assign([], this.arrPath)
      this.levelList.shift()
    },
    deepFinds(node, target) {
      this.arrPath.push(node)
      if (node.path === target) {
        this.count++
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const flag = this.deepFinds(node.children[i], target)
          if (!flag) { this.arrPath.pop() } else { break }
        }
      }
      return this.count > 0
    }
  }
}
</script>

<style lang="scss" scoped>
.main-text{
    cursor: auto;
    &:hover{
        color: $--color-fff;
    }
}
.main-inner{
    display: inline-block;
}
</style>
