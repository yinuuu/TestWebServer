/*
 * @Author: shasha.qiang
 * @Date: 2021-01-12 16:23:41
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-10 09:44:19
 * @Description: 注册路由信息
 */
import Router from '@/router'
import { constantRoutes } from '@/router'
import store from '@/store'
import routes from '@/api/routes'
import Layout from '@theme'

/**
 * @description: 遍历后台传来的路由字符串，转换为组件对象
 * @param {*} routes  路由字符串
 * @param {*} accessedRoutes  动态路由数组
 * @return {*}
 */
function filterRouter(routes, accessedRoutes) {
  routes.filter(route => {
    if (route.component) {
      route.path = route.path || `/${route.component}`
      route.component = _import(route.component)
      accessedRoutes.push(route)
    }
    if (route.children && route.children.length) {
      filterRouter(route.children, accessedRoutes)
    }
  })
}

function _import(file) {
  return resolve => require([`@/views/${file}.vue`], resolve)
}
function initRoutes() {
  const childrenRoutes = []
  filterRouter(routes, childrenRoutes)
  // 动态加载的路由会放在已存在的路由最后，所有path*放在此处
  const accessedRoutes = [{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: childrenRoutes
  },
  { path: '*', redirect: '/404', hidden: true }
  ]
  store.dispatch('permission/initRoutes', [...constantRoutes, ...routes])
  Router.addRoutes(accessedRoutes)
}
export default initRoutes

