<!--
 * @Author: xin.chen
 * @Date: 2020-08-19 15:15:28
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-05 17:01:39
 * @Description:
-->
<template>
  <div class="app-footer">
    <a
      href="http://npm.kingstarfintech.com/"
      target="_blank"
    >本框架由金仕达金融研究院——前端架构部提供技术支持  版本号：{{ settings.version }}</a>
  </div>
</template>

<script>
import settings from '@/settings'

export default {
  name: 'TemplateFoot',
  data() {
    return {
      settings
    }
  }
}
</script>
<style lang="scss" scoped>
// 底部脚注部分
.app-footer {
  position: absolute;
  bottom: 0;
  height: 40px;
  width: 100%;
  text-align: center;
  font-size: $--font-14;
  letter-spacing: 1px;
  line-height: 40px;
  background-color: rgb(0,11,29, 0.6);
  a {
    text-decoration: none;
    color: $--color-fff;
  }
  a:hover {
    color: $--color-a0cfff;
  }
}
</style>
