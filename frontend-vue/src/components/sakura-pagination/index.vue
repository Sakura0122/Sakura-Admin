<script setup lang="ts">
import type { DefaultPaginationData } from '@/hooks/usePagination'

defineOptions({ name: 'SakuraPagination' })

const pagination = defineModel<DefaultPaginationData>('pagination', {
  default: () => ({})
})
</script>

<template>
  <el-pagination
    v-model:current-page="pagination.currentPage"
    v-model:page-size="pagination.pageSize"
    :page-sizes="[10, 20, 50, 100]"
    background
    layout="total, prev, pager, next, sizes"
    :total="pagination.total"
  />
</template>

<style scoped lang="scss"></style>
