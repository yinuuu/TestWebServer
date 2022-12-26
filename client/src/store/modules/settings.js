/*
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 09:06:37
 * @LastEditTime: 2022-01-06 19:37:45
 * @LastEditors: xin.chen
 */
import variables from '@assets/styles/common/variables.scss'
import defaultSettings from '@/settings'
const { themeStyle, showBreadcrum, showCached, style, darkModel, loginStyle, watermarkSwitch, watermarkConfig } = defaultSettings

const state = {
  theme: variables.theme,
  themeStyle: themeStyle, // 主题风格，标准版-standard，简约版-simple和圆角版-fruity
  showBreadcrum: showBreadcrum, // 是否展示面包屑
  loginStyle: loginStyle, // 登录风格设置
  style: style,
  darkModel: darkModel, // 夜间模式
  showCached: showCached, // 页面缓存
  watermarkSwitch: watermarkSwitch, // 水印开关
  watermarkConfig: watermarkConfig // 水印配置
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ state, commit, dispatch }, data) {
    commit('CHANGE_SETTING', data)
    if (!state.showCached) {
      dispatch('tagsView/delAllCachedViews', null, { root: true })
    } else {
      dispatch('tagsView/setCachedView', null, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

