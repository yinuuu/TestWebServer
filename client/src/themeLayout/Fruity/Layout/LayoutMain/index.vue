<!--
 * @Author: sihan.gong
 * @Date: 2021-01-22 09:33:20
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-18 13:46:31
 * @Description: 主体
-->
<template>
  <div class="main-wrap" :class="{'mian-wrap-style':showBreadcrum}">
    <div v-if="showBreadcrum" class="bread">
      <bread-crumb />
    </div>
    <nav-tab />
    <div class="main-tabs-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import NavTab from './NavTab'
import AppMain from '@theme/components/AppMain'
import BreadCrumb from '@/components/Breadcrumb'
export default {
  name: 'LayoutMain',
  components: {
    NavTab,
    AppMain,
    BreadCrumb
  },
  computed: {
    showBreadcrum() {
      return this.$store.state.settings.showBreadcrum
    }
  }
}
</script>

<style lang="scss" scoped>
.main-wrap {
  background: $--color-fff;
  border-radius: 30px;
  margin: 0 10px 10px 0;
  padding: 20px;
  .bread{
    background-color: $--color-fff;
    padding-left: 0;
    padding-bottom: 5px;
  }
  .main-tabs-container {
    border: none;
  }
}
.mian-wrap-style{
  padding-top: 10px;
}
</style>
