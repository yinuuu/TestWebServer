/*
 * @Author: shasha.qiang
 * @Date: 2021-03-26 16:13:32
 * @LastEditors: genfa.zeng
 * @LastEditTime: 2021-08-13 10:13:42
 * @Description: file content
 */
const state = {
  portalList: [
    {
      title: '营业统计',
      component: 'income',
      id: 'income',
      width: '30%',
      height: 170,
      x: 0,
      y: 0
    },
    {
      title: '营业支出',
      component: 'spending',
      id: 'spending',
      width: '30%',
      height: 170,
      x: '31%',
      y: 0
    },
    {
      title: '净利润',
      component: 'profit',
      id: 'profit',
      width: '30%',
      height: 170,
      x: '62%',
      y: 0
    },
    {
      title: '订单查询',
      component: 'order',
      id: 'order',
      width: '49%',
      height: 330,
      x: 0,
      y: 190
    },
    {
      title: '股票查询',
      component: 'order',
      id: 'code',
      width: '49%',
      height: 330,
      x: '50%',
      y: 190
    }
    // {
    //   title: '访问量',
    //   component: 'visits',
    //   id: 'visits',
    //   width: 578,
    //   height: 315,
    //   x: 14,
    //   y: 330
    // },
    // {
    //   title: '仪表盘',
    //   component: 'panel',
    //   id: 'panel',
    //   width: 578,
    //   height: 315,
    //   x: 600,
    //   y: 330
    // }
  ]
}

const mutations = {
  CHANGE_PORTALS: (state, portalList) => {
    // eslint-disable-next-line no-prototype-builtins
    state.portalList = portalList
  }
}

const actions = {
  changePortals({ commit }, data) {
    commit('CHANGE_PORTALS', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
