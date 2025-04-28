<script lang="ts">
export default {
  name: 'MenuItem',
}
</script>
<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'

defineOptions({ name: 'MenuItem' })

defineProps<{
  menuList: RouteRecordRaw[]
}>()

const router = useRouter()
//点击菜单的回调
const goRoute = (vc: any) => {
  //路由跳转
  router.push(vc.index)
}
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item v-if="!item.children?.length && !item.meta?.hidden" :index="item.path" @click="goRoute">
      <el-icon>
        <component :is="item.meta?.icon || ''" />
      </el-icon>
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>

    <template v-if="item.children?.length">
      <!-- 有且只有一个子路由 -->
      <menu-item v-if="item.children.length === 1" :menu-list="item.children" />

      <!-- 有多个子路由 -->
      <el-sub-menu v-if="item.children.length > 1" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta?.icon || ''" />
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <menu-item :menu-list="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>
