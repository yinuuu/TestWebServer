<!--
 * @Author: sihan.gong
 * @Date: 2021-01-22 09:09:06
 * @LastEditors: xin.chen
 * @LastEditTime: 2021-11-04 17:03:50
 * @Description: 圆润主题index
-->
<template>
  <div class="view-container">
    <layout-aside class="menu-aside" />
    <div class="main-container">
      <layout-head class="menu-head" />
      <layout-main class="menu-main" />
    </div>
  </div>
</template>

<script>
import LayoutAside from './Layout/LayoutAside'
import LayoutHead from './Layout/LayoutHead'
import LayoutMain from './Layout/LayoutMain'

export default {
  components: {
    LayoutAside,
    LayoutHead,
    LayoutMain
  }
}
</script>

<style lang="scss" scoped>
.view-container {
  height: 100%;
  background-color: $--color-primary;
  background-image: url('~@assets/image/paopao.svg');
  background-repeat: no-repeat;
  background-position: -100px -50px;
  background-size: auto 100%;
  overflow: auto;
  .main-container {
    display: flex;
    flex-direction: column;
    height: inherit;
    // overflow: auto;
  }
}
</style>
