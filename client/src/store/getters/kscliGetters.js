/*
 * @Description: getters的封装
 * @Author: shengchao.yuan
 * @Date: 2021-06-21 14:47:12
 * @LastEditTime: 2022-01-10 09:39:05
 * @LastEditors: xin.chen
 */

const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  watermarkSwitch: state => state.settings.watermarkSwitch,
  watermarkConfig: state => state.settings.watermarkConfig
}
export default getters
