<!--
 * @Author: shasha.qiang
 * @Date: 2021-03-15 11:19:28
 * @LastEditors: xin.chen
 * @LastEditTime: 2021-11-04 17:05:33
 * @Description: 操作预警
-->
<template>
  <div class="warning-container">
    <div class="warning-img" />
    <div class="warning-text">
      <ks-text class="text__top">操作预警(次)</ks-text>
      <ks-text class="text__bottom">488</ks-text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.warning-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-image: url('~@assets/image/homePages/bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 12Px;
  color: $--color-fff;
  box-shadow: 0Px 2Px 11Px 0Px rgba(89, 94, 198, 0.2);
  .warning-img {
    text-align: center;
    width: 84Px;
    height: 84Px;
    background-image: url('~@assets/image/homePages/warning1.png');
    background-size: 100% 100%;
    margin:0 0 0 30Px;
  }
  .warning-text {
    padding-left: 30Px;
    display: flex;
    flex-direction: column;
    .text__top {
      font-size: 16Px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      line-height: 32Px;
    }
    .text__bottom {
      font-size: 36Px;
      font-weight: bold;
      line-height: 42Px;
    }
  }
}
</style>
