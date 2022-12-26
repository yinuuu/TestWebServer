/*
 * @Author: sihan.gong
 * @Date: 2021-01-28 17:09:38
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-06 14:17:10
 * @Description: rem等比适配配置文件
 */
// import store from '@/store'

// rem等比适配配置文件
// 基准大小
const baseSize = 14
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  const fontsize = baseSize * Math.min(scale, 4)
  document.documentElement.style.fontSize =
    (fontsize >= 12 ? fontsize : 12) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}
