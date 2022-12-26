/*
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 17:23:35
 * @LastEditTime: 2022-01-10 14:47:04
 * @LastEditors: xin.chen
 */
import Vue from 'vue'
import Vuex from 'vuex'
import plugins from './plugins/presist'
import { mergeFile } from '@utils/tools/helper'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const gettersFiles = require.context('./getters', true, /\.js$/)
const modules = mergeFile(modulesFiles, 'modules')
const getters = mergeFile(gettersFiles, 'getters')

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [...plugins]
})

export default store
