//小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSettingStore = defineStore('setting', () => {
  // 用户控制菜单折叠还是收起控制
  const fold = ref(false)
  // 控制刷新效果
  const refresh = ref(false)

  return { fold, refresh }
})

export default useSettingStore
