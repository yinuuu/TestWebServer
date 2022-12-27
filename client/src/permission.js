/*
 * @Author: shasha.qiang
 * @Date: 2021-01-04 09:22:09
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-10 14:16:39
 * @Description: file content
 */
import router from './router'
import NProgress from 'nprogress' // 页面加载进度条
import 'nprogress/nprogress.css' // 页面加载进度条样式
import { getToken } from '@utils/init/auth' // 获取token信息
import getPageTitle from '@utils/tools/get-page-title'
import store from './store'
import initRoutes from '@utils/init/init-routes'
import { getConfigToken } from '@/api/login' // 动态注册路由信息
NProgress.configure({ showSpinner: false }) // 初始化进度条的默认设置

const whiteList = ['/login', '/adminPass']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const routes = store.state.permission.routes
      if (routes.length) {
        next()
      } else {
        initRoutes()
        next({ ...to, replace: true })
      }
    }
  } else {
    /* has no token*/
    const res = await getConfigToken()
    if (whiteList.indexOf(to.path) !== -1) {
      if (to.path === '/login' && !res.data.data) {
        next(`/adminPass`)
      } else {
        next()
      }
    } else {
      if (!res.data.data) {
        next(`/adminPass`)
      } else {
        next(`/login?redirect=${to.path}`)
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
