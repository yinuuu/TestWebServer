<!--
 * @Author: yiwen.wu
 * @Date: 2021-09-28 10:00:37
 * @LastEditTime: 2021-10-25 11:05:41
 * @LastEditors: yiwen.wu
 * @Description: simple主题
 * @FilePath: /ks-vue-template/src/themeLayout/Simple/index.vue
-->
<template>
  <div class="view-container">
    <layout-head class="menu-head" />
    <layout-main :class="{'menu-main-style':showBreadcrum}" class="menu-main" />
  </div>
</template>

<script>
import LayoutHead from './Layout/LayoutHead'
import LayoutMain from './Layout/LayoutMain'

export default {
  name: 'Simple',
  components: {
    LayoutHead,
    LayoutMain
  },
  computed: {
    showBreadcrum() {
      return this.$store.state.settings.showBreadcrum
    }
  }
}
</script>

<style lang="scss" scoped>
.view-container {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}
</style>
