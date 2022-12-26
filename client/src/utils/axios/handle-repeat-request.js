/*
 * @Author: xin.chen
 * @Date: 2021-12-16 10:06:26
 * @LastEditors: xin.chen
 * @LastEditTime: 2021-12-16 10:10:20
 * @Description:
 */

// 清除所有pending状态的请求
export function clearPendingPool(pendingPool, whiteList = []) {
  if (!pendingPool.size) return

  const pendingUrlList = Array.from(pendingPool.keys()).filter(url => !whiteList.includes(url))
  if (!pendingUrlList.length) return

  pendingUrlList.forEach(url => {
    // 设置了config.global，则不需取消请求
    if (!pendingPool.get(url).global) {
      pendingPool.get(url).cancelFn()
      pendingPool.delete(url)
    }
  })
  return pendingUrlList
}
