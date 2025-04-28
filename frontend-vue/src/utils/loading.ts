import { ElLoading } from 'element-plus'

let loadingInstance: ReturnType<typeof ElLoading.service>

const startLoading = () => {
  loadingInstance = ElLoading.service({
    lock: true,
    text: '加载中……',
    fullscreen: true,
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

let count = 0

// 显⽰loading的函数并且记录请求次数 ++
export const showLoading = () => {
  if (count === 0) startLoading()
  count++
}
// 隐藏loading的函数，并且记录请求次数 --
export const hideLoading = () => {
  if (count <= 0) return
  count--
  if (count === 0) loadingInstance.close()
}
