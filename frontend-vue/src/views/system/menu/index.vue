<script setup lang="ts">
import SakuraCard from '@/components/sakura-card/index.vue'
import { ref, useTemplateRef } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import menuApi from '@/api/system/menu'
import type { MenuForm, MenuVo } from '@/api/system/menu/type.ts'
import MenuDialog from '@/views/system/menu/components/menu-dialog.vue'

const tableData = ref<MenuVo[]>([])
const getMenuData = async () => {
  const res = await menuApi.getMenuData()
  tableData.value = res.data
}
getMenuData()

// 新增菜单
const menuDialogRef = useTemplateRef<InstanceType<typeof MenuDialog>>('menuDialog')
const handleAdd = (parentId: string) => {
  menuDialogRef.value?.addOpen(parentId)
}

// 编辑菜单
const handleUpdate = (row: MenuForm) => {
  menuDialogRef.value?.editOpen(row)
}

// 删除菜单
const handleDelete = (id: string) => {
  ElMessageBox.confirm('确定删除？', '提示').then(async () => {
    await menuApi.deleteMenu(id)
    ElMessage.success('删除成功')
    getMenuData()
  })
}
</script>

<template>
  <sakura-card title="菜单管理">
    <template #tools>
      <el-button type="primary" @click="handleAdd('0')">添加菜单</el-button>
    </template>
    <el-table :data="tableData" style="width: 100%" row-key="id" max-height="100%">
      <el-table-column prop="title" label="菜单名称" />
      <el-table-column prop="component" label="路由名称" />
      <el-table-column prop="perms" label="权限标识" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status == 1 ? 'success' : 'info'">
            {{ row.status == 1 ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sortValue" label="排序" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-space>
            <a v-permission="'sys.menu.add'" @click="handleAdd(row.id)" v-if="row.type !== 2">新增</a>
            <a v-permission="'sys.menu.update'" @click="handleUpdate(row)">编辑</a>
            <a v-permission="'sys.menu.delete'" @click="handleDelete(row.id)">删除</a>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <menu-dialog ref="menuDialog" @update="getMenuData" />
  </sakura-card>
</template>

<style scoped lang="scss"></style>
