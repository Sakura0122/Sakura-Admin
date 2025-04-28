<script setup lang="ts">
import SakuraCard from '@/components/sakura-card/index.vue'
import SakuraPagination from '@/components/sakura-pagination/index.vue'
import { useTable } from '@/hooks/useTable.ts'
import userApi from '@/api/system/user'
import type { UserQuery, UserVo } from '@/api/system/user/type.ts'
import { ref, useTemplateRef } from 'vue'
import type { PageDto } from '@/types/type.ts'
import SakuraDatePicker from '@/components/sakura-date-picker/index.vue'
import UserDialog from '@/views/system/user/components/user-dialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import SetRoleDialog from '@/views/system/user/components/set-role-dialog.vue'
import { downloadFile } from '@/utils/utils.ts'

const queryParams = ref<UserQuery>({
  keyword: '',
  beginTime: '',
  endTime: '',
})
const { pagination, list, search } = useTable((params: PageDto<UserQuery>) => userApi.getUserData(params), {
  params: queryParams.value,
})

const handleExportUser = async () => {
  const res = await userApi.exportUser()
  downloadFile(res.data)
}

const userDialogRef = useTemplateRef<InstanceType<typeof UserDialog>>('userDialog')
const addUser = () => {
  userDialogRef.value?.open()
}
const updateUser = (row: UserVo) => {
  userDialogRef.value?.open(row)
}
const deleteUser = (id: string) => {
  ElMessageBox.confirm('确定删除吗？', '提示').then(() => {
    userApi.deleteUser(id).then(() => {
      ElMessage.success('删除成功')
      search()
    })
  })
}

const setRoleDialogRef = useTemplateRef<InstanceType<typeof SetRoleDialog>>('setRoleDialog')
const setUserRole = (id: string) => {
  setRoleDialogRef.value?.open(id)
}
</script>

<template>
  <sakura-card title="用户管理">
    <template #tools>
      <el-button type="primary" v-permission="'sys.user.add'" @click="addUser">新增用户</el-button>
      <div class="right">
        <div class="item">
          <div class="label">创建时间</div>
          <sakura-date-picker v-model:start="queryParams.beginTime" v-model:end="queryParams.endTime" />
        </div>
        <div class="item">
          <div class="label">关键字</div>
          <el-input
            placeholder="请输入用户名、姓名、手机号"
            v-model="queryParams.keyword"
            clearable
            style="width: 240px"
          />
        </div>
        <div class="item">
          <el-button v-permission="'sys.user.export'" type="primary" @click="handleExportUser"> 导出 </el-button>
        </div>
        <div class="item">
          <el-button v-permission="'sys.user.query'" type="primary" @click="search">查询</el-button>
        </div>
      </div>
    </template>
    <el-table :data="list" style="width: 100%" max-height="100%">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="avatar" label="头像">
        <template #default="{ row }">
          <img class="avatar" :src="row.avatar" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status == 1 ? 'success' : 'info'">
            {{ row.status == 1 ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-space>
            <a v-permission="'sys.user.set_role'" @click="setUserRole(row.id)">分配角色</a>
            <a v-permission="'sys.user.update'" @click="updateUser(row)">编辑</a>
            <a v-permission="'sys.user.delete'" @click="deleteUser(row.id)">删除</a>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <sakura-pagination :pagination />
    <user-dialog ref="userDialog" @update="search" />
    <set-role-dialog ref="setRoleDialog" />
  </sakura-card>
</template>

<style scoped lang="scss">
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
