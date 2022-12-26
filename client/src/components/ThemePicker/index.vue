<!--
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 09:06:37
 * @LastEditTime: 2021-11-16 16:15:36
 * @LastEditors: xin.chen
-->
<template>
  <ks-color-picker
    v-model="theme"
    :predefine="colorList"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
    @change="changeTheme"
  />
</template>

<script>
import themeJs from '@utils/init/theme.js'
export default {
  mixins: [themeJs],
  created() {
    // 混入模式，防止初始的主题二次更新
    this.originTheme = this.defaultTheme
  },
  methods: {
    changeTheme(val) {
      const themeColor = val || this.defaultTheme
      this.theme = themeColor
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: themeColor
      })
    }
  }
}
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .ks-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .ks-color-dropdown__link-btn {
  display: none;
}
</style>
