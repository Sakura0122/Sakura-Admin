import axios from 'axios'
import type { Method, AxiosRequestConfig } from 'axios'
import type { Data } from '@/types/type.ts'
import { hideLoading, showLoading } from '@/utils/loading'
import { getToken } from '@/utils/token.ts'
import { message } from '@/utils/AntdGlobal.ts'
import userStore from '@/stores/user.ts'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
})

service.interceptors.request.use(
  (config) => {
    showLoading()
    const token = getToken()
    if (token) {
      config.headers['sakura-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (res) => {
    hideLoading()
    if (res.config.responseType === 'blob') {
      const type = res.headers['content-type']
      const filename = decodeURIComponent(res.headers['content-disposition'].split('=')[1])
      return {
        data: {
          blob: res.data,
          type,
          filename,
        },
      }
    }

    if (res.data.code === 200) {
      return res.data
    } else if (res.data.code === 208) {
      message.error(res.data.message || '登录过期，请重新登录')
      userStore.getState().reset()
      return Promise.reject(res.data)
    } else {
      message.error(res.data.message || '网络异常')
      return Promise.reject(res.data)
    }
  },
  (error) => {
    hideLoading()
    message.error('请求错误')
    return Promise.reject(error)
  },
)

const baseRequest = (method: Method) => {
  return <T>(url: string, submitData?: object, config?: AxiosRequestConfig) => {
    return service.request<T, Data<T>>({
      url,
      method,
      [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
      ...config,
    })
  }
}

const request = {
  get: baseRequest('get'),
  post: baseRequest('post'),
  put: baseRequest('put'),
  delete: baseRequest('delete'),
}

export default request
