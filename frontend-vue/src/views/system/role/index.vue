<script setup lang="ts">
import SakuraCard from '@/components/sakura-card/index.vue'
import SakuraPagination from '@/components/sakura-pagination/index.vue'
import { useTable } from '@/hooks/useTable.ts'
import { ref, useTemplateRef } from 'vue'
import type { PageDto } from '@/types/type.ts'
import { ElMessage, ElMessageBox } from 'element-plus'
import roleApi from '@/api/system/role'
import type { RoleQuery, RoleVo } from '@/api/system/role/type.ts'
import RoleDialog from '@/views/system/role/components/role-dialog.vue'
import SetMenuDialog from '@/views/system/role/components/set-menu-dialog.vue'

const queryParams = ref<RoleQuery>({
  keyword: '',
})
const { pagination, list, search } = useTable((params: PageDto<RoleQuery>) => roleApi.getRoleData(params), {
  params: queryParams.value,
})

const setMenuDialogRef = useTemplateRef<InstanceType<typeof SetMenuDialog>>('setMenuDialog')
const setMenu = (id: string) => {
  setMenuDialogRef.value?.open(id)
}

const roleDialogRef = useTemplateRef<InstanceType<typeof RoleDialog>>('roleDialog')
const addRole = () => {
  roleDialogRef.value?.open()
}
const updateRole = (row: RoleVo) => {
  roleDialogRef.value?.open(row)
}
const deleteRole = (id: string) => {
  ElMessageBox.confirm('确定删除吗？', '提示').then(() => {
    roleApi.deleteRole(id).then(() => {
      ElMessage.success('删除成功')
      search()
    })
  })
}
</script>

<template>
  <sakura-card title="角色管理">
    <template #tools>
      <el-button type="primary" @click="addRole">新增角色</el-button>
      <div class="right">
        <div class="item">
          <div class="label">关键字</div>
          <el-input placeholder="请输入角色名称、编码" v-model="queryParams.keyword" clearable style="width: 240px" />
        </div>
        <div class="item">
          <el-button v-permission="'sys.role.query'" type="primary" @click="search">查询</el-button>
        </div>
      </div>
    </template>
    <el-table :data="list" style="width: 100%" max-height="100%">
      <el-table-column prop="roleName" width="200" label="角色名称" />
      <el-table-column prop="roleCode" width="200" label="角色编码" />
      <el-table-column prop="description" width="400" label="描述" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-space>
            <a v-permission="'sys.role.set_menu'" @click="setMenu(row.id)">分配权限</a>
            <a v-permission="'sys.role.update'" @click="updateRole(row)">编辑</a>
            <a v-permission="'sys.role.delete'" @click="deleteRole(row.id)">删除</a>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <sakura-pagination :pagination />
    <role-dialog ref="roleDialog" @update="search" />
    <set-menu-dialog ref="setMenuDialog" />
  </sakura-card>
</template>

<style scoped lang="scss">
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
