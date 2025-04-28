<script setup lang="ts">
import { ref } from 'vue'
import type { RoleList, UserRoleForm } from '@/api/system/user/type.ts'
import userApi from '@/api/system/user'

const emit = defineEmits<{
  (e: 'update'): void
}>()

const visible = ref(false)
const genderForm = (): UserRoleForm => {
  return {
    userId: '',
    roleIds: [],
  }
}
const form = ref(genderForm())

const checkAll = ref(false)
const isIndeterminate = ref(true)
const roleList = ref<RoleList[]>([])

// 获取用户角色id和全部角色
const getUserRole = async () => {
  const res = await userApi.getUserRole(form.value.userId)
  form.value.roleIds = res.data.selectIds
  roleList.value = res.data.roleList
}

const handleCheckAllChange = (val: boolean) => {
  form.value.roleIds = val ? roleList.value.map((role) => role.id) : []
  isIndeterminate.value = false
}
const handleCheckedRolesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === roleList.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < roleList.value.length
}

const open = (id: string) => {
  form.value.userId = id
  getUserRole()
  visible.value = true
}

// 弹窗关闭的回调
const handleClose = () => {
  form.value = genderForm()
}

const handleSubmit = async () => {
  await userApi.setUserRole(form.value)
  emit('update')
  visible.value = false
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="visible" title="设置角色" width="500" @close="handleClose">
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="form.roleIds" @change="handleCheckedRolesChange">
      <el-checkbox v-for="role in roleList" :key="role.id" :value="role.id">
        {{ role.roleName }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
