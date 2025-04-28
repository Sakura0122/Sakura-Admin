import { create } from 'zustand'
import { removeToken } from '@/utils/token.ts'
import { UserInfoVo } from '@/api/system/user/type.ts'
import { AppRoute, asyncRoutes, constantRoute } from '@/router/routes.tsx'
import { MenuProps } from 'antd'

interface UserStore {
  userinfo: UserInfoVo
  routes: AppRoute[]
  menuRoutes: MenuProps['items']
  setUserinfo: (userinfo: UserInfoVo) => void
  reset: () => void
}

const userStore = create<UserStore>()((set) => ({
  userinfo: {
    avatar: '',
    name: '',
    phone: '',
    buttons: [],
    roles: [],
    menus: [],
  },
  routes: [],
  menuRoutes: [],
  setUserinfo: (userinfo) => {
    const userRouter = filterAsyncRoute(asyncRoutes, userinfo.menus)
    const userAllRoutes = [...constantRoute, ...userRouter]
    const generatedMenu = generateMenu(userAllRoutes)
    set({ userinfo, menuRoutes: generatedMenu, routes: userAllRoutes })
  },
  reset: () => {
    removeToken()
    set({
      userinfo: {
        avatar: '',
        name: '',
        phone: '',
        buttons: [],
        roles: [],
        menus: [],
      },
    })
    window.location.href = '/login'
  },
}))

/*const userStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        menuRoutes: [],
        avatar: '',
        name: '',
        buttons: [],
        setToken: (token) => set({ token }),
        setUserinfo: (userinfo) => set({ ...userinfo }),
      }),
      {
        name: 'frontend-react', // 本地存储的 key
        partialize: (state) => ({ token: state.token }), // 只持久化 token
      },
    ),
    { name: 'user-store' },
  ),
)*/

function filterAsyncRoute(asyncRoute: AppRoute[], route: string[]) {
  const result = []
  const routeSet = new Set(route)
  for (const item of asyncRoute) {
    if (routeSet.has(item.meta?.name as string)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, route)
      }
      result.push(item)
    }
  }
  return result
}
function generateMenu(routes: AppRoute[]): MenuProps['items'] {
  return routes
    .filter((route) => !route.meta?.hidden)
    .map((route) => {
      const menuItem: any = {
        key: route.path!,
        label: route.meta?.title,
        icon: route.meta?.icon,
      }

      if (route.children?.length) {
        menuItem.children = generateMenu(route.children)
        if (menuItem.children.length === 0) return null
      }

      return menuItem
    })
    .filter(Boolean)
}

export default userStore
