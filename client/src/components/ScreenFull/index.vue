<!--
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 17:23:35
 * @LastEditTime: 2022-01-20 09:14:39
 * @LastEditors: xin.chen
-->
<template>
  <i :class="isFullscreen?'ks-icon-direction-shrink':'ks-icon-direction-expansion2'" @click="click" />
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
    this.$hotkey.bind('f11', this.click)
  },
  beforeDestroy() {
    this.destroy()
    this.$hotkey.unbind('f11', this.click)
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: $--color-5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
