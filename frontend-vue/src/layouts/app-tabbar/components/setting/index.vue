<script setup lang="ts">
import useSettingStore from '@/stores/modules/setting'
import useUserStore from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

defineOptions({ name: 'Setting' })

const router = useRouter()
const userStore = useUserStore()
const settingStore = useSettingStore()

// 刷新按钮点击回调
const handleRefresh = () => {
  settingStore.refresh = !settingStore.refresh
}

// 全屏按钮点击的回调
const handleFullScreen = () => {
  // document.fullscreenElement 是一个 DOM 属性，如果当前处于全屏模式，则返回当前处于全屏模式的 Element 对象；否则返回 null
  const full = document.fullscreenElement
  // 切换为全屏模式
  if (!full) {
    // 文档根节点的方法requestFullscreen,实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}

// 收集开关的数据
const dark = ref(false)

// 颜色组件组件的数据
const color = ref('#409eff')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
  // 获取HTML根节点
  const html = document.documentElement
  // 判断HTML标签是否有类名dark
  if (dark.value) {
    html.className = 'dark'
  } else {
    html.className = ''
  }
}

// 主题颜色的设置
const setColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}

// 退出登录点击回调
const handleLogout = async () => {
  await userStore.userLogout()
  // 跳转到登录页面
  router.push('/login')
}
</script>

<template>
  <div class="setting-container">
    <el-button size="small" icon="Refresh" circle @click="handleRefresh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="handleFullScreen"></el-button>
    <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
      <!-- 表单元素 -->
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker @change="setColor" v-model="color" size="small" show-alpha :predefine="predefineColors" />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            @change="changeDark"
            v-model="dark"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button size="small" icon="Setting" circle></el-button>
      </template>
    </el-popover>
    <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%" alt="" />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.setting-container {
  display: flex;
  align-items: center;
}
</style>
