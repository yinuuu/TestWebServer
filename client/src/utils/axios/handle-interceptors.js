import { getToken } from '@utils/init/auth'
/**
 * @param {Object} config
 * @return {Object}
 */
export const handleRequest = (config) => {
  // 是否需要清空上一页面的请求
  // it is really a thing that just an idiot can do
  config.headers['Accept'] = 'application/json'
  if (config.headers['Content-Type'] !== 'multipart/form-data') { config.headers['Content-Type'] = 'application/json;charset=UTF-8' }
  if (!config.noNeedToken) { // 登录的时候不需要token ,因为带上这个请求头掉登录接口（GG
    config.headers.Authorization = ('Bearer ' + getToken()) || ''
  }
  return config
}
