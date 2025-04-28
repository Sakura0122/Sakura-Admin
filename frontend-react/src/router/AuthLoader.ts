import userApi from '@/api/system/user'
import userStore from '@/stores/user.ts'

export async function AuthLoader() {
  const { userinfo, setUserinfo } = userStore.getState()

  // 如果已有用户信息，直接返回
  if (userinfo.name) {
    return userinfo
  }
  const res = await userApi.getUserInfo()
  setUserinfo(res.data)
  const { menus, buttons, roles } = res.data
  return {
    menus,
    buttons,
    roles,
  }
}
