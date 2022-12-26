/*
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 09:06:37
 * @LastEditTime: 2021-01-12 17:08:05
 * @LastEditors: shasha.qiang
 */
const state = {
  routes: []
}
const mutations = {
  INIT_ROUTES(state, routes) {
    state.routes = routes
  }
}
const actions = {
  initRoutes({ commit }, routes) {
    commit('INIT_ROUTES', routes)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
