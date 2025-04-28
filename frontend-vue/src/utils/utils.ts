import type { Export } from '@/types/type.ts'

/**
 * 获取当前时间
 */
export function getTime(): string {
  const hours = new Date().getHours()
  return hours <= 9 ? '早上' : hours <= 12 ? '上午' : hours <= 18 ? '下午' : '晚上'
}

/**
 * 下载文件
 * @param data 后端返回数据
 */
export function downloadFile(data: Export) {
  const blob = new Blob([data.blob], {
    type: data.type,
  })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = data.filename
  document.body.appendChild(a)
  a.style.display = 'none'
  a.click()
  document.body.removeChild(a)
}
