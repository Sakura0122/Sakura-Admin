import type { MenuVo } from '@/api/system/menu/type.ts'

export type RoleQuery = {
  /**
   * 角色名称或编码
   */
  keyword: string
}

export type RoleVo = {
  /**
   * ID
   */
  id: string
  /**
   * 角色名称
   */
  roleName: string
  /**
   * 角色编码
   */
  roleCode: string
  /**
   * 描述
   */
  description: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 更新时间
   */
  updateTime: string
}

export type RoleForm = {
  /**
   * ID
   */
  id: string
  /**
   * 角色名称
   */
  roleName: string
  /**
   * 角色编码
   */
  roleCode: string
  /**
   * 描述
   */
  description: string
}

export type MenuList = {
  id: string
  title: string
  children: MenuList[]
}

export interface RoleMenuVo {
  /**
   * 菜单列表
   */
  menuList: MenuList[]
  /**
   * 选中的菜单id
   */
  selectIds: string[]
}

export type roleMenuForm = {
  /**
   * 菜单id数组
   */
  menuIds: string[]
  /**
   * 角色id
   */
  roleId: string
}
