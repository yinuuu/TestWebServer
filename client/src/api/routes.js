/*
 * @Author: shasha.qiang
 * @Date: 2021-01-12 10:52:19
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-11 11:18:53
 * @Description: 模拟菜单数据
 */
const routes = [
  {
    path: '/demo/DragTable',
    name: 'DragTable',
    meta: {
      title: '基础模块',
      icon: 'ks-icon-other-arrangement'
    },
    children: [
      {
        name: 'DragTable',
        meta: {
          title: '可拖拽表格',
          icon: 'ks-icon-navigation-table',
          hidden: false
        },
        component: 'demo/DragTable'
      },
      {
        name: 'EditTable',
        meta: {
          title: '可编辑表格',
          icon: 'ks-icon-navigation-form',
          hidden: false
        },
        component: 'demo/EditTable'
      },
      {
        name: 'JsonEditor',
        meta: {
          title: 'json数据',
          icon: 'ks-icon-navigation-text',
          hidden: false
        },
        component: 'demo/JsonEditor'
      }
    ]
  },
  {
    path: '/moduleDemo/index',
    name: 'ModuleDemo',
    meta: {
      title: '示例模块',
      icon: 'ks-icon-navigation-labelwrapper'
    },
    children: [
      {
        name: 'ModuleDemo',
        meta: { title: '可配置的页面生成器', icon: 'list', hidden: false },
        component: 'moduleDemo/index'
      }
    ]
  }
]
export default routes
