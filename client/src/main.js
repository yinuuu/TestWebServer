/*
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 09:06:37
 * @LastEditTime: 2022-01-20 09:59:03
 * @LastEditors: xin.chen
 */
import Vue from 'vue'

// 资源载入
import 'normalize.css/normalize.css' // a modern alternative to CSS resets'
import keyMaster from 'keymaster'
import KingStar from 'kingstar-ui'
import 'kingstar-ui/lib/theme-chalk/index.css'
import '@assets/styles/common/import.scss'
import '@assets/styles/common/index.scss'
import './icons'

import '@utils/init/rem'

import App from './App'
import store from './store'
import router from './router'

import './permission' // permission control
import defaultSettings from './settings'

import { bindKeyHandler } from '@utils/tools/helper.js'
// 快捷键
Vue.prototype.$hotkey = {
  bind: (seed, func) => keyMaster(seed, bindKeyHandler(func)),
  ...keyMaster
}

Vue.prototype.$setting = defaultSettings
Vue.use(KingStar, {
  size: 'medium' // set kingstar-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
