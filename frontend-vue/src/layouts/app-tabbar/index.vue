<script setup lang="ts">
import Breadcrumb from './components/breadcrumb/index.vue'
import Setting from './components/setting/index.vue'

defineOptions({ name: 'AppTabbar' })
</script>

<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <breadcrumb />
    </div>
    <div class="tabbar-right">
      <setting />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
