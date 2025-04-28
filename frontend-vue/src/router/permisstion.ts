import router from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/stores/modules/user'

/** 免登录白名单 */
const whiteList = ['/login', '/404']

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  const token = userStore.token
  const name = userStore.name

  // 如果没有登录
  if (!token) {
    // 如果是白名单页面，直接放行
    if (whiteList.includes(to.path)) return next()
    return next('/login')
  }

  // 如果已经登录且存在用户信息
  if (name) return next()

  // 否则要重新获取权限角色
  try {
    // 获取用户信息
    await userStore.getUserInfo()
    // 万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
    next({ ...to, replace: true })
  } catch (e) {
    // token过期:获取不到用户信息了
    // 用户手动修改本地存储token
    // 退出登录->用户相关的数据清空
    await userStore.userLogout()
    next('/login')
  }
})

router.afterEach(() => {
  NProgress.done()
})
