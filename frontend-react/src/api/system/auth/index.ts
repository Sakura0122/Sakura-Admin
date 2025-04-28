import request from '@/utils/request.ts'
import type { LoginDto } from '@/api/system/auth/type.ts'

/**
 * 登录相关的接口
 */
const authApi = {
  /**
   * 获取验证码
   * @param key redis存储的key
   */
  getCaptcha(key: string) {
    return request.get<string>('/system/auth/captcha', { key })
  },
  /**
   * 登录
   * @param data 登录信息
   */
  login(data: LoginDto) {
    return request.post<string>('/system/auth/login', data)
  },
}

export default authApi
