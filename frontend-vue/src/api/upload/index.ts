import request from '@/utils/request.ts'

/**
 * 上传
 * @param data 文件
 */
export function uploadApi(data: File) {
  const formData = new FormData()
  formData.append('file', data)
  return request.post<string>('/system/upload', formData)
}
