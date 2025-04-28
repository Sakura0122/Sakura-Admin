<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import useSettingStore from '@/stores/modules/setting'

defineOptions({ name: 'AppMain' })

const settingStore = useSettingStore()
const isFlag = ref(true)
watch(
  () => settingStore.refresh,
  () => {
    isFlag.value = false
    nextTick(() => {
      isFlag.value = true
    })
  }
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in" mode="out-in">
      <component :is="Component" v-if="isFlag" />
    </transition>
  </router-view>
</template>
