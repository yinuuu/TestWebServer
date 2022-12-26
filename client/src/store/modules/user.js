/*
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-29 09:06:10
 * @LastEditTime: 2022-01-10 09:47:20
 * @LastEditors: xin.chen
 */
/* eslint-disable prefer-promise-reject-errors */
import { getToken, setToken, removeToken } from '@utils/init/auth'
const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo = {}) {
    const token = new Date().getTime()
    commit('SET_TOKEN', token)
    commit('SET_USERINFO', userInfo)
    setToken(token)
  },
  // 退出登录
  logout({ commit, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_USERINFO', [])
    removeToken()
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
