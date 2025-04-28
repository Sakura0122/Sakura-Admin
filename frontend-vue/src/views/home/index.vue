<script setup lang="ts">
import useUserStore from '@/stores/modules/user'
import { getTime } from '@/utils/utils'

defineOptions({ name: 'Home' })

const userStore = useUserStore()
</script>

<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好呀{{ userStore.name }}</h3>
        <p class="subtitle">Sakura的管理系统</p>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}

.bottoms {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
