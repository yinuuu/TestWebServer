/*
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2021-02-07 17:39:50
 * @LastEditTime: 2021-02-07 17:41:57
 * @LastEditors: shengchao.yuan
 */
import adaptive from './adaptive'

const install = function(Vue) {
  Vue.directive('ks-height-adaptive-table', adaptive)
}

if (window.Vue) {
  window['ks-height-adaptive-table'] = adaptive
  Vue.use(install); // eslint-disable-line
}

adaptive.install = install
export default adaptive
