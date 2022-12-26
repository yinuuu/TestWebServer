/*
 * @Author: xin.chen
 * @Date: 2021-12-14 14:34:29
 * @LastEditors: xin.chen
 * @LastEditTime: 2021-12-14 14:35:41
 * @Description:
 */

import { Loading } from 'kingstar-ui'
import _ from 'lodash'
// loading处理
let loading = null
let requestCount = 0
export const showLoading = function(target) {
  if (!loading && requestCount === 0) {
    loading = Loading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.5)',
      target: target || 'body'
    })
  }
  requestCount++
}
// 关闭loading
export const hideLoading = function() {
  requestCount--
  if (requestCount <= 0) {
    // 关闭loading
    debounce()
  }
}
const debounce = _.debounce(() => {
  // 防止多个同步接口依次处理的时候，因为防抖造成的loading的异常关闭
  if (requestCount == 0) {
    loading && loading.close()
    loading = null
  }
}, 300)
