<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { ElMessage, type FormInstance, type FormRules, type UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { uploadApi } from '@/api/upload'
import type { UserForm, UserVo } from '@/api/system/user/type.ts'
import userApi from '@/api/system/user'
import type { RoleForm, RoleVo } from '@/api/system/role/type.ts'
import roleApi from '@/api/system/role'

const emit = defineEmits<{
  (e: 'update'): void
}>()

const visible = ref(false)
const genderForm = (): RoleForm => {
  return {
    id: '',
    roleName: '',
    roleCode: '',
    description: '',
  }
}
const form = ref(genderForm())
const formRef = useTemplateRef<FormInstance>('formRef')
const rules = ref<FormRules<RoleForm>>({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
})

const open = (data?: RoleVo) => {
  form.value = genderForm()
  formRef.value?.clearValidate()
  if (data) form.value = JSON.parse(JSON.stringify(data))
  visible.value = true
}

// 弹窗关闭的回调
const handleClose = () => {}

const handleSubmit = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      form.value.id ? await roleApi.updateRole(form.value) : await roleApi.addRole(form.value)
      ElMessage.success(form.value.id ? '编辑角色成功' : '新增角色成功')
      emit('update')
      visible.value = false
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="visible" :title="form.id ? '编辑角色' : '新增角色'" width="600" @close="handleClose">
    <el-form :model="form" label-width="80" ref="formRef" :rules>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="form.roleCode" placeholder="请输入角色编码" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.description" placeholder="请输入角色描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
