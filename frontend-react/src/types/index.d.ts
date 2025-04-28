import { AxiosRequestConfig } from 'axios'

interface ImportMetaEnv {
  readonly VITE_BASE_API: string
}

declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean
  }
}
