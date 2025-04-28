<script setup lang="ts">
import useSettingStore from '@/stores/modules/setting'
import { useRoute } from 'vue-router'

defineOptions({ name: 'Breadcrumb' })

const settingStore = useSettingStore()
const route = useRoute()
</script>

<template>
  <div class="breadcrumb-container">
    <el-icon class="fold" @click="settingStore.fold = !settingStore.fold">
      <component :is="settingStore.fold ? 'Fold' : 'Expand'" />
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <!-- 面包动态展示路由名字与标题 -->
      <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index" v-show="item.meta.title" :to="item.path">
        <!-- 图标 -->
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <!-- 面包屑展示匹配路由的标题 -->
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb-container {
  display: flex;
  align-items: center;

  .fold {
    margin-right: 10px;
    cursor: pointer;
  }

  ::v-deep(.el-breadcrumb__inner) {
    display: flex;
    align-items: center;

    .el-icon {
      margin-right: 2px;
    }
  }
}
</style>
