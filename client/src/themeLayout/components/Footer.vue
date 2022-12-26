<!--
 * @Author: xin.chen
 * @Date: 2020-08-19 15:15:28
 * @LastEditors: yiwen.wu
 * @LastEditTime: 2021-07-28 14:10:22
 * @Description:
-->
<template>
  <div class="app-footer">
    <a href="http://npm.kingstarfintech.com/" target="_blank">
      本框架由金仕达金融研究院——前端架构部提供技术支持
    </a>
  </div>
</template>

<script>
export default {
  name: 'TemplateFoot'
}
</script>
<style lang="scss" scoped>
// 底部脚注部分
.app-footer {
  position: absolute;
  bottom: 10px;
  height: 20px;
  width: 100%;
  text-align: center;
  font-size: $--font-14;
  letter-spacing: 1px;
  a {
    text-decoration: none;
    color: $--color-fff;
  }
  a:hover {
    color: $--color-a0cfff;
  }
}
</style>
