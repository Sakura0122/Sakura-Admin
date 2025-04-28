import request from '@/utils/request.ts'
import type { MenuForm, MenuVo } from '@/api/system/menu/type.ts'

const menuApi = {
  /**
   * 获取菜单列表
   */
  getMenuData() {
    return request.get<MenuVo[]>('/system/menu')
  },
  /**
   * 新增菜单
   * @param data 菜单信息
   */
  addMenu(data: MenuForm) {
    return request.post<string>('/system/menu', data)
  },
  /**
   * 修改菜单
   * @param data 菜单信息
   */
  updateMenu(data: MenuForm) {
    return request.put<string>('/system/menu', data)
  },
  /**
   * 删除菜单
   * @param ids 菜单ID 多个逗号分割
   */
  deleteMenu(ids: string) {
    return request.delete<string>(`/system/menu/${ids}`)
  },
}

export default menuApi
