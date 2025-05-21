<script setup lang="ts">
import Logo from './logo/index.vue'
import MenuItem from './menu-item/index.vue'
import AppMain from './app-main/index.vue'
import AppTabbar from './app-tabbar/index.vue'
import useUserStore from '@/stores/modules/user'
import { useRoute } from 'vue-router'
import useSettingStore from '@/stores/modules/setting'

defineOptions({ name: 'Layout' })

const route = useRoute()
const userStore = useUserStore()
const settingStore = useSettingStore()
</script>

<template>
  <el-container class="layout-container">
    <el-aside :class="{ fold: !!settingStore.fold }">
      <Logo />
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :collapse="settingStore.fold"
          :collapse-transition="false"
          :default-active="route.path"
          background-color="#001529"
          text-color="#fff"
        >
          <menu-item :menu-list="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header>
        <app-tabbar />
      </el-header>

      <el-main>
        <!--<el-scrollbar>-->
        <app-main />
        <!--</el-scrollbar>-->
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;

  .el-aside {
    width: 260px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    transition: all 0.3s;

    &.fold {
      width: 64px;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - 50px);

      .el-menu {
        border-right: none;
      }
    }
  }

  .el-header {
    border-bottom: 1px solid #dcdfe6;
    height: 50px;
  }
}
</style>
