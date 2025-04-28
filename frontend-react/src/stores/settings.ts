import { create } from 'zustand'

// 定义状态类型
type SettingsStore = {
  collapsed: boolean
  refresh: boolean
  setCollapsed: (collapsed: boolean) => void
  setRefresh: (refresh: boolean) => void
}

const settingsStore = create<SettingsStore>((set) => ({
  // 用户控制菜单折叠还是收起控制
  collapsed: false,
  // 控制刷新效果
  refresh: false,
  setCollapsed: (collapsed) => set({ collapsed }),
  setRefresh: (refresh) => set({ refresh }),
}))

export default settingsStore
