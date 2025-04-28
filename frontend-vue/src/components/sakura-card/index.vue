<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({ name: 'SakuraCard' })

interface Tabs {
  cat_name: string
  cat_code: string
}

interface CardProps {
  isHead?: boolean
  isTools?: boolean
  title?: string
  allow?: boolean
  tabs?: Tabs[]
  defaultTabActive?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  isHead: true,
  isTools: true,
  allow: true,
  tabs: () => [],
})

const emits = defineEmits<{
  'update:modelValue': [cat_code: string]
  change: [item: Tabs]
}>()

const tabActive = ref(props.defaultTabActive)

const autoTabs = computed<Tabs[]>(() => {
  if (props.tabs?.length) {
    const result = [...props.tabs]
    if (props.allow) {
      result.unshift({ cat_name: '全部', cat_code: '' })
    }
    return result
  }
  return []
})

const handleTabClick = (item: Tabs) => {
  tabActive.value = item.cat_code
  emits('update:modelValue', item.cat_code)
  emits('change', item)
}
</script>

<template>
  <div class="sakura-card" v-bind="$attrs">
    <div class="sakura-card-head" v-if="isHead">
      <div class="sakura-card-head-left">
        <slot name="title">
          <div class="sakura-card-head-left-title" v-if="title">{{ title }}</div>
        </slot>
        <div class="sakura-card-head-left-tabs" v-if="tabs?.length">
          <div
            class="sakura-card-head-left-tabs-item"
            :class="{ active: item.cat_code === tabActive }"
            v-for="item in autoTabs"
            :key="item.cat_code"
            @click="handleTabClick(item)"
          >
            {{ item.cat_name }}
          </div>
        </div>
      </div>
      <div class="sakura-card-head-right">
        <slot name="head-end" />
      </div>
    </div>
    <div class="sakura-card-tools" v-if="isTools">
      <slot name="tools" />
    </div>

    <div class="sakura-card-body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sakura-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(182, 182, 182, 0.5);
  height: 100%;

  .sakura-card-head {
    flex: 0 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    box-sizing: content-box;
    border-bottom: 1px solid rgba(237, 237, 237, 1);
    padding: 0 20px;
    flex-shrink: 0;

    .sakura-card-head-left {
      display: flex;
      height: 100%;

      .sakura-card-head-left-title {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 500;
        color: #4d4d4d;
        margin-right: 20px;
      }

      .sakura-card-head-left-tabs {
        display: flex;

        .sakura-card-head-left-tabs-item {
          font-weight: 400;
          display: flex;
          align-items: center;
          padding: 0 10px;
          cursor: pointer;
          font-size: 16px;
          color: #4d4d4d;
          margin-right: 5px;

          &.active {
            color: var(--primary-color);
            font-weight: 700;
          }
        }
      }
    }
  }

  .sakura-card-tools {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
    padding: 0 20px;

    ::v-deep(.right) {
      display: flex;
      align-items: center;
      margin-left: auto;

      .item {
        display: flex;
        align-items: center;

        .label {
          flex-shrink: 0;
          margin-right: 10px;
        }
      }

      > * {
        margin-left: 20px;
      }
    }
  }

  .sakura-card-body {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
    padding: 0 20px;

    :deep(.el-table) {
      flex: 1;

      .el-table__inner-wrapper {
        &:before {
          content: none;
        }
      }
    }

    :deep(.el-pagination) {
      justify-content: center;
      margin-bottom: 20px;
    }
  }
}
</style>
