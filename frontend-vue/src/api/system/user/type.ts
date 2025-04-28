export type UserInfoVo = {
  /**
   * 头像
   */
  avatar: string
  /**
   * 菜单
   */
  menus: string[]
  /**
   * 姓名
   */
  name: string
  /**
   * 按钮权限
   */
  buttons: string[]
  /**
   * 手机
   */
  phone: string
  /**
   * 角色编码
   */
  roles: string[]
}

export type UserQuery = {
  /**
   * 开始时间
   */
  beginTime: string
  /**
   * 结束时间
   */
  endTime: string
  /**
   * 关键字
   */
  keyword: string
}

export type UserVo = {
  /**
   * 头像
   */
  avatar: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 描述
   */
  description: string
  /**
   * ID
   */
  id: number
  /**
   * 姓名
   */
  name: string
  /**
   * 手机
   */
  phone: string
  /**
   * 状态（1：正常 0：停用）
   */
  status: number
  /**
   * 更新时间
   */
  updateTime: string
  /**
   * 用户名
   */
  username: string
}

export type UserForm = {
  /**
   * ID
   */
  id: string
  /**
   * 头像
   */
  avatar: string
  /**
   * 描述
   */
  description: string
  /**
   * 姓名
   */
  name: string
  /**
   * 密码
   */
  password: string
  /**
   * 手机
   */
  phone: string
  /**
   * 状态（1：正常 0：停用）
   */
  status: number
  /**
   * 用户名
   */
  username: string
}

export type RoleList = {
  /**
   * 角色id
   */
  id: string
  /**
   * 角色编码
   */
  roleCode: string
  /**
   * 角色名称
   */
  roleName: string
}

export type UserRoleVo = {
  /**
   * 角色信息数组
   */
  roleList: RoleList[]
  /**
   * 选中id数组
   */
  selectIds: string[]
}

export type UserRoleForm = {
  /**
   * 选中id数组
   */
  roleIds: string[]
  /**
   * 用户id
   */
  userId: string
}
