<!--
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-25 18:01:10
 * @LastEditTime: 2021-11-11 14:46:33
 * @LastEditors: xin.chen
-->
<template>
  <div class="layout-container">
    <WaterMark v-if="watermarkSwitch" :watermark-config="watermarkConfig" />
    <component :is="componentName" />
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Standard from './Standard'
import Fruity from './Fruity'
import Simple from './Simple'
import WaterMark from '@/components/WaterMark'
export default {
  name: 'Layout',
  components: {
    Standard,
    Fruity,
    Simple,
    WaterMark
  },
  computed: {
    ...mapGetters([
      'watermarkSwitch',
      'watermarkConfig'
    ]),
    componentName() {
      const themeStyle = this.$store.state.settings.themeStyle
      switch (themeStyle) {
        case 'fruity':
          return 'Fruity'
        case 'simple':
          return 'Simple'
        default:
          return 'Standard'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container{
  height: 100%;
}
// 菜单管理页面
.menu-container {
  height: 100%;
  // demo右侧主体和tabs部分
  .main-container {
    height: 100%;
    overflow: hidden;
  }
  .menu-main{
    padding: 0 5px;
  }
}
</style>
