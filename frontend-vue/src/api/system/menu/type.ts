export type MenuVo = {
  children: MenuVo[]
  /**
   * 组件名称
   */
  component: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * id
   */
  id: number
  /**
   * 所属上级
   */
  parentId: number
  /**
   * 权限标识
   */
  perms: string
  /**
   * 排序
   */
  sortValue: number
  /**
   * 状态(0:禁止,1:正常)
   */
  status: number
  /**
   * 菜单标题
   */
  title: string
  /**
   * 类型(1:菜单,2:按钮)
   */
  type: number
  /**
   * 更新时间
   */
  updateTime: string
}

export type MenuForm = {
  /**
   * id
   */
  id: string
  /**
   * 组件名称
   */
  component: string
  /**
   * 父级id
   */
  parentId: string
  /**
   * 权限标识
   */
  perms: string
  /**
   * 排序
   */
  sortValue: number
  /**
   * 状态(0:禁止,1:正常)
   */
  status: number
  /**
   * 菜单标题
   */
  title: string
  /**
   * 类型(1:菜单,2:按钮)
   */
  type: number
}
