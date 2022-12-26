/*
 * @Author: xin.chen
 * @Date: 2021-12-14 17:42:56
 * @LastEditors: xin.chen
 * @LastEditTime: 2022-01-17 16:14:11
 * @Description:
 */

/**
 * @description: 处理报错信息
 * @return {*}
 * @param err
 */
export const handelErrMes = (err) => {
  const { response } = err
  if (!response?.status) {
    err.code = ''
    err.message = '未知错误，请联系管理解决相关问题'
  }
  err.code = response?.status

  switch (response?.status) {
    case 400:
      err.message = '请求错误(400)'
      break
    case 401:
      err.message = '未授权，请重新登录(401)'
      break
    case 403:
      err.message = '拒绝访问(403)'
      break
    case 404:
      err.message = '请求出错(404)'
      break
    case 408:
      err.message = '请求超时(408)'
      break
    case 500:
      err.message = '服务器错误(500)'
      break
    case 501:
      err.message = '服务未实现(501)'
      break
    case 502:
      err.message = '网络错误(502)'
      break
    case 503:
      err.message = '服务不可用(503)'
      break
    case 504:
      err.message = '网络超时(504)'
      break
    case 505:
      err.message = 'HTTP版本不受支持(505)'
      break
    default:
      err.message = '请求错误'
  }
  return err
}

