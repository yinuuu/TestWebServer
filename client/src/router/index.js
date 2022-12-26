/*
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 09:06:37
 * @LastEditTime: 2022-01-20 10:19:33
 * @LastEditors: xin.chen
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@theme'
// 在三级路由及以上嵌套的路由，需要配置该文件为对应父级菜单的component
// import EmptyTemplate from '@/layout/components/EmptyTemplate.vue'
/*
 * path:路径
 * component:组件，若为菜单项且有二级菜单，需要在父级菜单上定义component
 * hidden:设置为true表示不会出现在侧边菜单栏上
 * alwaysShow:只用于动态路由，设置为true表示显示根菜单,默认显示
 * title: 菜单名，显示在菜单栏和页面头上
   *   icon: 图标
    *  affix：设置为true表示固定在tabs头上
   *   roles：['admin','editor'] 只给设置的用户相应的权限
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    meta: { title: '404' },
    hidden: true
  },
  {
    path: '/adminPass',
    component: () => import('@/views/adminPass/adminPass.vue'),
    meta: { title: 'adminPass' },
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    showFirstChild: 1,
    hidden: true,
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'ks-icon-other-home', affix: true }
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    base: '/',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router

