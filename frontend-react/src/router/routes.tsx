import { RouteObject } from 'react-router-dom'
import LazyLoad from '@/router/LazyLoad.tsx'
import { AppstoreAddOutlined, DesktopOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import * as React from 'react'
import { lazy } from 'react'

interface RouteMeta {
  title?: string
  name?: string
  hidden?: boolean // 是否隐藏菜单
  icon?: React.ReactNode // 支持传入 React 组件
}

export type AppRoute = RouteObject & {
  meta?: RouteMeta
  children?: AppRoute[]
}

const Home = lazy(() => import('@/views/home'))
const User = lazy(() => import('@/views/system/user'))
const Role = lazy(() => import('@/views/system/role'))
const Menu = lazy(() => import('@/views/system/menu'))

export const constantRoute: AppRoute[] = [
  {
    path: '/home',
    element: LazyLoad(Home),
    meta: {
      title: '工作台',
      name: 'home',
      icon: <DesktopOutlined />,
    },
  },
]
export const asyncRoutes: AppRoute[] = [
  {
    path: '/system',
    meta: { title: '系统管理', name: 'system', icon: <SettingOutlined /> },
    children: [
      {
        path: '/system/user',
        element: LazyLoad(User, 'sysUser'),
        meta: {
          title: '用户管理',
          name: 'sysUser',
          icon: <UserOutlined />,
        },
      },
      {
        path: '/system/role',
        element: LazyLoad(Role, 'sysRole'),
        meta: {
          title: '角色管理',
          name: 'sysRole',
          icon: <TeamOutlined />,
        },
      },
      {
        path: '/system/menu',
        element: LazyLoad(Menu, 'sysMenu'),
        meta: {
          title: '菜单管理',
          name: 'sysMenu',
          icon: <AppstoreAddOutlined />,
        },
      },
    ],
  },
]
