/*
 * @description: 基本配置信息
 * @author: shengchao.yuan
 * @Date: 2020-11-16 09:39:38
 * @LastEditTime: 2022-01-25 11:07:06
 * @LastEditors: xin.chen
 */

module.exports = {
  title: 'KSP前端架构平台',
  version: 'v4.1.0',
  showBreadcrum: false,
  style: false,
  themeStyle: 'standard',
  showCached: false,
  darkModel: false,
  themeColorList: ['2b90ff', '6CD23A', 'F2AC00', 'F03B2C', '9B9FA6'],
  loginStyle: 'middle',
  watermarkSwitch: true, // 水印开关
  watermarkConfig: { // 水印默认设置
    width: '200',
    height: '200',
    textAlign: 'left',
    textBaseline: 'middle',
    font: '16',
    fillStyle: 'rgba(184, 184, 184, 0.6)',
    rotate: '45', // 旋转角度
    staticContent: '金仕达金融科技研究院', // 静态内容
    dynamicContent: [], // 动态内容
    connectSymbol: ' ', // 连接符号
    zIndex: '9999'
  }
}
