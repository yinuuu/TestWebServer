<!--
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 09:06:37
 * @LastEditTime: 2022-01-20 09:26:15
 * @LastEditors: xin.chen
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import themeJs from '@utils/init/theme.js'

export default {
  name: 'App',
  mixins: [themeJs]
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>
