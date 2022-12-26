<!--
 * @Author: xin.chen
 * @Date: 2020-07-29 14:45:51
 * @LastEditors: yiwen.wu
 * @LastEditTime: 2021-09-03 16:34:45
 * @Description: login page
-->
<template>
  <!-- 登录页面 -->
  <div class="login-container">
    <component :is="fetchLoginComponent()" />
    <!-- 底部脚注 -->
    <Footer />
  </div>
</template>

<script>
import LeftLayout from './components/LeftLayout'
import MiddleLayout from './components/MiddleLayout'
import RightLayout from './components/RightLayout'

import Footer from './components/Footer'

export default {
  name: 'Login',
  components: {
    LeftLayout,
    MiddleLayout,
    RightLayout,
    Footer
  },
  methods: {
    fetchLoginComponent() {
      const style = this.$store.state.settings.loginStyle
      switch (style) {
        case 'left':
          return 'LeftLayout'
        case 'middle':
          return 'MiddleLayout'
        case 'right':
          return 'RightLayout'
      }
    }
  }
}
</script>

<style lang="scss" src="./index.scss"></style>
