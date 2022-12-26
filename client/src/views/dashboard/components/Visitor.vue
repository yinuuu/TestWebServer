<!--
 * @Author: shasha.qiang
 * @Date: 2021-03-15 11:19:28
 * @LastEditors: xin.chen
 * @LastEditTime: 2021-11-04 17:06:10
 * @Description: 今日访客
-->
<template>
  <div class="visitor-container">
    <div class="visitor-img" />
    <div class="visitor-text">
      <div class="text__top">今日访客(次)</div>
      <div class="text__bottom">230</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.visitor-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-image: url('~@assets/image/homePages/bg_hover.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 12Px;
  color: $--color-fff;
  box-shadow: 0Px 2Px 11Px 0Px rgba(89, 94, 198, 0.2);
  .visitor-img {
    text-align: center;
    width: 84Px;
    height: 84Px;
    margin-left:30px;
    background-image: url('~@assets/image/homePages/visitors2.png');
    background-size: 100% 100%;
  }
  .visitor-text {
    padding-left: 30Px;
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
