<!--
 * @Author: shasha.qiang
 * @Date: 2021-03-15 11:19:28
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-08-13 09:53:30
 * @Description: 净利润
-->
<template>
  <div class="profit-container">
    <div class="profit-text">
      <ks-text class="text__top">净利润</ks-text>
      <ks-text class="text__bottom">
        10,023
        <span>(+18%)</span>
      </ks-text>
      <ks-text class="text__remark">年度预算 150,000</ks-text>
    </div>
    <svg-icon icon-class="profit" class="profit-img" />
  </div>
</template>

<style lang="scss" scoped>
.profit-container {
  width: 100%;
  height: 100%;
  padding: 30Px;
  display: flex;
  color: $--color-primary;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 12Px;
  box-shadow: 0Px 2Px 11Px 0Px rgba(89, 94, 198, 0.2);
  .profit-text {
    display: flex;
    flex-direction: column;
    .text__top {
      font-size: 18Px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      line-height: 25Px;
    }
    .text__bottom {
      font-size: 32Px;
      font-weight: bold;
      line-height: 45Px;
      span {
        font-size: 14Px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: $--color-f03b2c;
        line-height: 20Px;
      }
    }
    .text__remark {
      opacity: 0.5;
      font-size: 14Px;
      line-height: 20Px;
    }
  }
  .profit-img {
    color: $--color-primary;
    width: 60Px;
    height: 60Px;
  }
}
</style>
