import request from '@/utils/request.ts'
import type { PageDto, PageVo } from '@/types/type.ts'
import type { RoleForm, roleMenuForm, RoleMenuVo, RoleQuery, RoleVo } from '@/api/system/role/type.ts'

const roleApi = {
  /**
   * 获取角色列表
   * @param data 查询条件
   */
  getRoleData(data: PageDto<RoleQuery>) {
    return request.get<PageVo<RoleVo>>('/system/role', data)
  },
  /**
   * 新增角色
   * @param data 角色信息
   */
  addRole(data: RoleForm) {
    return request.post<string>('/system/role', data)
  },
  /**
   * 修改角色
   * @param data 角色信息
   */
  updateRole(data: RoleForm) {
    return request.put<string>('/system/role', data)
  },
  /**
   * 删除角色
   * @param ids 角色ID 多个逗号分割
   */
  deleteRole(ids: string) {
    return request.delete<string>(`/system/role/${ids}`)
  },
  /**
   * 获取角色菜单
   * @param id 角色ID
   */
  getRoleMenu(id: string) {
    return request.get<RoleMenuVo>(`/system/role/menu/${id}`)
  },
  /**
   * 修改用户角色
   * @param data 用户角色信息
   */
  setRoleMenu(data: roleMenuForm) {
    return request.put<string>('/system/role/menu', data)
  },
}

export default roleApi
