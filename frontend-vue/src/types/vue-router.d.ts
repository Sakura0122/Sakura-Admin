import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 设置该路由在侧边栏和面包屑中展示的名字
     */
    title?: string

    /**
     * 设置该路由在菜单中是否隐藏
     */
    hidden?: boolean

    /**
     * 设置该路由的图标
     */
    icon?: string
  }
}
