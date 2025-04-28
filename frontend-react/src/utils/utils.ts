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

export function transformData(data: any[]) {
  return data.map((item) => {
    const newItem = { ...item }

    if (Array.isArray(newItem.children)) {
      if (newItem.children.length === 0) {
        newItem.children = false
      } else {
        newItem.children = transformData(newItem.children)
      }
    }

    return newItem
  })
}

/**
 * 递归获取id
 * @param array 树形结构数组
 */
type TreeArray = {
  id: string
  children?: TreeArray[]
  [key: string]: any
}

export function recursionGetId(array: TreeArray[]): string[] {
  if (!Array.isArray(array)) return []
  const result: string[] = []
  array.forEach((item) => {
    if (item.id) {
      result.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      result.push(...recursionGetId(item.children))
    }
  })
  return result
}
