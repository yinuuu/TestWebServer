/*
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-12-01 09:06:37
 * @LastEditTime: 2022-01-10 09:42:04
 * @LastEditors: xin.chen
 */
import request from '@utils/axios/request'

// 获取域列表
export function get_user_fields(data) {
  return request({
    url: '/get_user_fields/',
    method: 'post',
    data: { data: JSON.stringify(data) }
  })
}

// 登录
export function login(data) {
  return request({
    url: '/login/',
    method: 'post',
    data: { data: JSON.stringify(data) }
  })
}

// 获取用户信息
export function my_name() {
  return request({
    url: '/my_name/',
    method: 'post',
    data: { data: JSON.stringify({ mode: 1 }) }
  })
}

// 获取配置token
export const getConfigToken = () => request({
  baseURL: process.env.VUE_APP_BASE_TEST,
  url: `/getConfigToken`,
  repeat: true, // 允许重复请
  method: 'get'
})

// 数据库初始化
export const initDB = data => request({
  baseURL: process.env.VUE_APP_BASE_TEST,
  url: '/initDB',
  method: 'post',
  data
})

export const execShell = data => request({
  baseURL: process.env.VUE_APP_BASE_TEST,
  url: '/execShell',
  method: 'post',
  data
})
