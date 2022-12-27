/*
 * @description: 描述说明
 * @author: shengchao.yuan
 * @Date: 2020-11-18 08:44:28
 * @LastEditTime: 2022-01-20 10:50:11
 * @LastEditors: xin.chen
 */
import axios from 'axios'
import { Message } from 'kingstar-ui'
import { removeToken } from '@utils/init/auth.js'
import store from '@/store'
import router from '@/router'
import { hideLoading, showLoading } from './handle-loading'
import { clearPendingPool } from './handle-repeat-request'
import { handleRequest } from './handle-interceptors'
import { handelErrMes } from './handle-error'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  transformRequest: function(data, headers) {
    if (headers['Content-Type'] === 'application/json;charset=UTF-8') {
      return JSON.stringify(data)
    }
    return data
  },
  timeout: 5000
})

// 重复请求处理
const pendingPool = new Map()

service.interceptors.request.use(
  config => {
    showLoading(config.headers.loadingTarget)
    config = handleRequest(config)
    // 取消请求配置
    // config.cancelToken = new axios.CancelToken(cancelFn => {
    //   // 注意：这里要设置一下config.global，以便于实现一键取消请求
    //   pendingPool.has(config.url) ? cancelFn(`${config.url}请求重复`) : pendingPool.set(config.url, { cancelFn, global: config.global })
    // })
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    hideLoading()
    const { config } = response
    pendingPool.delete(config.url)
    return response.data || {}
  },
  error => {
    hideLoading()
    !axios.isCancel(error) && pendingPool.delete(error.config.url)
    error = handelErrMes(error)
    const res = error.response
    if (!res) {
      // 处理没有response的情况
      // eg: 超时、断网；请求重复被取消；主动取消请求
      // 错误信息err传入isCancel方法，可以判断请求是否被取消
      if (axios.isCancel(error)) {
        throw new axios.Cancel(error.message || '请求被取消')
      } else if (error.stack && error.stack.includes('timeout')) {
        error.message = '请求超时!'
      } else {
        error.message = '连接服务器失败，请检查服务'
      }
    }
    if (res?.status === 401) {
      removeToken()
      store.dispatch('tagsView/delAllViews', null, { root: true })
      router.push('/login')
      return Promise.reject(error)
    }
    Message({
      message: res?.data?.retMsg || error?.message || '系统错误，请检查服务',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 将取消所有方法提供给 service
service.clearPendingPool = clearPendingPool(pendingPool)

export default service
