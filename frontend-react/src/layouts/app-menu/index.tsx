import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoute } from '@/router/routes.tsx'
import userStore from '@/stores/user.ts'

function AppMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const { routes, menuRoutes } = userStore()

  useEffect(() => {
    // 设置初始选中状态
    const currentPath = location.pathname
    setSelectedKeys([currentPath])

    // 查找需要展开的父级菜单
    const parentKeys = findParentKeys(currentPath, routes)
    setOpenKeys(parentKeys)
  }, [])

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
    // const parentKeys = findParentKeys(key, routes)
    // setOpenKeys(parentKeys)
  }

  const [openKeys, setOpenKeys] = useState<string[]>([])
  const findParentKeys = (path: string, routes: AppRoute[]): string[] => {
    const keys: string[] = []

    const traverse = (routeList: AppRoute[], parentKeys: string[] = []) => {
      for (const route of routeList) {
        const currentPath = route.path || ''

        if (currentPath === path) {
          keys.push(...parentKeys)
          return true
        }

        if (route.children) {
          const found = traverse(route.children, [...parentKeys, currentPath])
          if (found) return true
        }
      }
      return false
    }

    traverse(routes)
    return keys
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      items={menuRoutes}
      onClick={handleClickMenu}
      onOpenChange={(keys) => setOpenKeys(keys)}
    />
  )
}

export default AppMenu
