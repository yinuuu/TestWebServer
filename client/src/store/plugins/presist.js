/*
 * @description: 直接在对应的modules中配置modules文件夹中的文件名即可
 * @author: shengchao.yuan
 * @Date: 2020-12-25 14:47:53
 * @LastEditTime: 2021-11-11 16:10:06
 * @LastEditors: xin.chen
 */
import VuexPersistence from 'vuex-persist'

// 存入localStorage的有theme
const vuexLocal = new VuexPersistence({
  key: 'ksp-cli',
  storage: window.localStorage,
  modules: ['settings', 'homePortals']
})

export default [
  vuexLocal.plugin
]
