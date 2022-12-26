<!--
 * @Author: sihan.gong
 * @Date: 2021-01-22 09:32:51
 * @LastEditors: yiwen.wu
 * @LastEditTime: 2021-09-27 14:25:47
 * @Description: 头部
-->
<template>
  <div class="fruity_head">
    <div class="usertools_container">
      <user-tools style-type="fruity" />
    </div>
  </div>
</template>

<script>
import UserTools from '@theme/components/UserTools'

export default {
  name: 'LayoutHead',
  components: { UserTools }
}
</script>
<style scoped lang="scss">

.fruity_head{
  display: flex;
  flex-direction: row;
  height: 59px;
  justify-content: flex-end;
  .usertools_container {
    float: right;
  }
}
</style>
