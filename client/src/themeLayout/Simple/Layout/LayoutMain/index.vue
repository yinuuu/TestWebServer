<!--
 * @Author: xin.chen
 * @Date: 2022-01-18 10:16:01
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-18 13:42:58
 * @Description: main page
-->
<template>
  <div class="main-wrap">
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

<style lang="scss" src="@assets/styles/layout/main.scss"></style>
