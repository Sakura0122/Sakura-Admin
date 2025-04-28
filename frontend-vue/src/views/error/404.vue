<script setup lang="ts">
import SvgIcon from '@/components/svg-icon/index.vue'
</script>

<template>
  <div class="error-page">
    <svg-icon name="404" width="400px" height="400px" />
    <router-link to="/" style="margin-top: 50px">
      <el-button type="primary">回到首页</el-button>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
