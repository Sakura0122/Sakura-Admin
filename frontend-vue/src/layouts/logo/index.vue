<script setup lang="ts">
import useSettingStore from '@/stores/modules/setting'

defineOptions({ name: 'Logo' })
const settingStore = useSettingStore()
</script>

<template>
  <div class="logo">
    <img src="@/assets/icons/logo.svg" alt="" />
    <p v-show="!settingStore.fold">Sakura的管理系统</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    margin-left: 10px;
    font-size: 20px;
    white-space: nowrap;
  }
}
</style>
