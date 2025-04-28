<script setup lang="ts">
import { computed } from 'vue'
import { ElDatePicker } from 'element-plus'

defineOptions({ name: 'SakuraDatePicker' })

defineProps<{
  start: string
  end: string
}>()

const emit = defineEmits<{
  (e: 'change', value: { start: string; end: string }): void
}>()

// 定义双向绑定模型
const startModel = defineModel('start', { default: '' })
const endModel = defineModel('end', { default: '' })

// 内部值处理
const innerValue = computed({
  get: () => [startModel.value, endModel.value],
  set: (val) => {
    const [start = '', end = ''] = val || []
    startModel.value = start
    endModel.value = end
  },
})

// 处理 change 事件
const handleChange = (val: string[] | null) => {
  const [start = '', end = ''] = val || []
  // 保持原生事件触发
  emit('change', { start, end })
}
</script>

<template>
  <el-date-picker
    v-model="innerValue"
    v-bind="$attrs"
    @change="handleChange"
    type="daterange"
    :editable="false"
    range-separator="~"
    start-placeholder="开始时间"
    end-placeholder="截止时间"
    value-format="YYYY-MM-DD"
    style="width: 240px"
  >
  </el-date-picker>
</template>

<style scoped lang="scss"></style>
