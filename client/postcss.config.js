/*
 * @Description:需要对scss进行预编译处理在此处配置，如果在vue.adminPass.js配置，会覆盖当前文件的配置内容：1、处理px转为rem，2、处理css编译处理content中乱码的问题
 * @Author: shengchao.yuan
 * @Date: 2021-03-20 09:52:16
 * @LastEditTime: 2021-04-02 19:30:12
 * @LastEditors: shengchao.yuan
 */
// 引入等比适配插件
const px2rem = require('postcss-px2rem')
// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 14
})
module.exports = {
  plugins: [
    require('postcss-sass-unicode'),
    require('autoprefixer'),
    postcss
  ]
}
