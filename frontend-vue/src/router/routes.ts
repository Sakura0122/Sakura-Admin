import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

// 对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute: RouteRecordRaw[] = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', // 菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    // 登录成功以后展示数据的路由
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
]

// 异步路由
export const asyncRoute: RouteRecordRaw[] = [
  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/system/user',
    children: [
      {
        path: '/system/user',
        component: () => import('@/views/system/user/index.vue'),
        name: 'sysUser',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/system/role',
        component: () => import('@/views/system/role/index.vue'),
        name: 'sysRole',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/system/menu',
        component: () => import('@/views/system/menu/index.vue'),
        name: 'sysMenu',
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
]

// 任意路由
export const anyRoute: RouteRecordRaw = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'DataLine',
  },
}
