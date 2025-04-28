import request from '@/utils/request.ts'
import type { UserForm, UserQuery, UserInfoVo, UserVo, UserRoleVo, UserRoleForm } from '@/api/system/user/type.ts'
import type { Export, PageDto, PageVo } from '@/types/type.ts'

const userApi = {
  /**
   * 获取用户信息
   */
  getUserInfo() {
    return request.get<UserInfoVo>('/system/user/userInfo')
  },
  /**
   * 获取用户列表
   * @param data 查询条件
   */
  getUserData(data: PageDto<UserQuery>) {
    return request.get<PageVo<UserVo>>('/system/user', data)
  },
  /**
   * 新增用户
   * @param data 用户信息
   */
  addUser(data: UserForm) {
    return request.post<string>('/system/user', data)
  },
  /**
   * 修改用户
   * @param data 用户信息
   */
  updateUser(data: UserForm) {
    return request.put<string>('/system/user', data)
  },
  /**
   * 删除用户
   * @param ids 用户ID 多个逗号分割
   */
  deleteUser(ids: string) {
    return request.delete<string>(`/system/user/${ids}`)
  },
  /**
   * 获取用户角色
   * @param id 用户ID
   */
  getUserRole(id: string) {
    return request.get<UserRoleVo>(`/system/user/role/${id}`)
  },
  /**
   * 修改用户角色
   * @param data 用户角色信息
   */
  setUserRole(data: UserRoleForm) {
    return request.put<string>('/system/user/role', data)
  },
  /**
   * 导出用户列表
   */
  exportUser() {
    return request.get<Export>('/system/user/export', {}, { responseType: 'blob' })
  },
}

export default userApi
