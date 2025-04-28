import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import { getToken, removeToken } from '@/utils/token'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import userApi from '@/api/system/user'

// 过滤当前用户需要的异步路由
function filterAsyncRoute(asyncRoute: RouteRecordRaw[], route: string[]) {
  const result = []
  const routeSet = new Set(route)
  for (const item of asyncRoute) {
    if (routeSet.has(item.name as string)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, route)
      }
      result.push(item)
    }
  }
  return result
}

const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const menuRoutes = ref<RouteRecordRaw[]>(constantRoute) as Ref<RouteRecordRaw[]>
  const avatar = ref('')
  const name = ref('')
  const buttons = ref<string[]>([])

  const getUserInfo = async () => {
    const res = await userApi.getUserInfo()

    const userAsyncRoute = filterAsyncRoute(asyncRoute, res.data.menus)
    menuRoutes.value = [...constantRoute, ...userAsyncRoute, anyRoute]
    ;[...userAsyncRoute, anyRoute].forEach((route) => {
      router.addRoute(route)
    })

    avatar.value = res.data.avatar
    name.value = res.data.name
    buttons.value = res.data.buttons
  }

  const userLogout = async () => {
    // await logoutApi()
    token.value = ''
    name.value = ''
    avatar.value = ''
    menuRoutes.value = constantRoute
    removeToken()
    router.push('/login')
  }

  // return { token, menuRoutes, avatar, username, buttons, userLogin, userInfo, userLogout }
  return { token, menuRoutes, avatar, name, buttons, getUserInfo, userLogout }
})

export default useUserStore
