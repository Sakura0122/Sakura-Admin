<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { ElMessage, type FormInstance, type FormRules, type UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { uploadApi } from '@/api/upload'
import type { UserForm, UserVo } from '@/api/system/user/type.ts'
import userApi from '@/api/system/user'

const emit = defineEmits<{
  (e: 'update'): void
}>()

const visible = ref(false)
const genderForm = (): UserForm => {
  return {
    id: '',
    avatar: '',
    description: '',
    name: '',
    password: '',
    phone: '',
    status: 0,
    username: '',
  }
}
const form = ref(genderForm())
const formRef = useTemplateRef<FormInstance>('formRef')
const rules = ref<FormRules<UserForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, message: '用户名不能小于4位', trigger: 'blur' },
    { max: 16, message: '用户名不能大于16位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不能小于6位', trigger: 'blur' },
    { max: 16, message: '密码不能大于16位', trigger: 'blur' },
  ],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
})

// 上传头像
const handleUploadChange = async (uploadFile: UploadFile) => {
  const rawFile = uploadFile.raw!
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(rawFile.type)) {
    ElMessage.error('只能上传jpg、png格式的图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2M')
    return false
  }
  const res = await uploadApi(uploadFile.raw!)
  form.value.avatar = res.data
}

const handleUploadRemove = () => {}

const open = (data?: UserVo) => {
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
      form.value.id ? await userApi.updateUser(form.value) : await userApi.addUser(form.value)
      ElMessage.success(form.value.id ? '编辑用户成功' : '新增用户成功')
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
  <el-dialog v-model="visible" :title="form.id ? '编辑用户' : '新增用户'" width="600" @close="handleClose">
    <el-form :model="form" label-width="70" ref="formRef" :rules>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!form.id">
        <el-input v-model="form.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleUploadChange"
          :on-remove="handleUploadRemove"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" alt="" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" placeholder="请输入用户描述" />
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
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
:deep(.avatar-uploader) {
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
