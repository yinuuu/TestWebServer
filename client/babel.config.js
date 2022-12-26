/*
 * @Description:基本的babel配置
 * @Author: shengchao.yuan
 * @Date: 2021-04-26 18:11:55
 * @LastEditTime: 2021-06-03 16:56:52
 * @LastEditors: shengchao.yuan
 */
module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    }
  }
}
