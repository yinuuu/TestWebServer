<!--
 * @Author: yiwen.wu
 * @Date: 2021-09-28 13:57:14
 * @LastEditTime: 2021-10-15 16:52:27
 * @LastEditors: yiwen.wu
 * @Description: header组件
 * @FilePath: /ks-vue-template/src/themeLayout/Simple/Layout/LayoutHead/index.vue
-->
<template>
  <div class="simple-header">
    <div class="header__logo">
      <svg-icon icon-class="kingstar_logo" class="logo" />
    </div>
    <div class="header__menu">
      <head-menu />
    </div>
    <div class="header__setting">
      <user-tools class="user-tools" />
    </div>
  </div>
</template>

<script>
import HeadMenu from './HeadMenu.vue'
import UserTools from '@theme/components/UserTools'

export default {
  name: 'LayoutHeader',
  components: {
    UserTools,
    HeadMenu
  },
  computed: {
    themeStyle() {
      return this.$store.state.settings.themeStyle
    }
  }
}
</script>

<style lang="scss" scoped>

.simple-header {
  height: 54px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  background-image: url("~@assets/image/header_bg.png");
  background-size: 620px 115px;
  background-repeat: no-repeat;
  background-position: 80% -20px;
  overflow: hidden;
  background-color: $--color-primary;
  color: $--color-fff;
  .header__logo {
    width: 230px;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    .logo {
      width: 180px;
      height: 100%;
    }
  }
  .header__menu {
    flex: 1;
    overflow: hidden;
  }
}

.user-tools {
  color: $--color-fff;
}
</style>
