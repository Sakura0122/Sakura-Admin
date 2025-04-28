<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { MenuForm, MenuVo } from '@/api/system/menu/type.ts'
import menuApi from '@/api/system/menu'

const emit = defineEmits<{
  (e: 'update'): void
}>()

const visible = ref(false)
const genderForm = (): MenuForm => {
  return {
    id: '',
    perms: '',
    parentId: '',
    title: '',
    component: '',
    type: 1,
    sortValue: 1,
    status: 1,
  }
}
const form = ref<MenuForm>(genderForm())
const formRef = useTemplateRef<FormInstance>('formRef')
const rules = ref<FormRules<MenuForm>>({
  title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
})

const addOpen = (parentId: string) => {
  form.value.parentId = parentId
  visible.value = true
}

const editOpen = (data: MenuVo) => {
  form.value = JSON.parse(JSON.stringify(data))
  visible.value = true
}

// 弹窗关闭的回调
const handleClose = () => {
  form.value = genderForm()
}

const handleSubmit = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      form.value.id ? await menuApi.updateMenu(form.value) : await menuApi.addMenu(form.value)
      ElMessage.success(form.value.id ? '编辑菜单成功' : '新增菜单成功')
      emit('update')
      visible.value = false
    }
  })
}

defineExpose({
  addOpen,
  editOpen,
})
</script>

<template>
  <el-dialog v-model="visible" :title="form?.id ? '编辑菜单' : '新增菜单'" width="500" @close="handleClose">
    <el-form :model="form" label-width="100" ref="formRef" :rules>
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :value="1">菜单</el-radio>
          <el-radio :value="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="路由名称" v-if="form.type === 1">
        <el-input v-model="form.component" placeholder="请输入路由名称" />
      </el-form-item>
      <el-form-item label="权限标识" v-if="form.type === 2">
        <el-input v-model="form.perms" placeholder="请输入权限标识" />
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          active-text="启用"
          inactive-text="禁用"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.sortValue" controls-position="right" :min="0" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
