<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue'
import { ElMessage, ElTree } from 'element-plus'
import type { MenuList, roleMenuForm } from '@/api/system/role/type.ts'
import roleApi from '@/api/system/role'

const visible = ref(false)
const genderForm = (): roleMenuForm => {
  return {
    roleId: '',
    menuIds: [],
  }
}
const form = ref(genderForm())

// 全部菜单
const menuList = ref<MenuList[]>([])

// 角色已有菜单
const selectMenuIds = ref<string[]>([])
const open = async (id: string) => {
  form.value.roleId = id
  const res = await roleApi.getRoleMenu(id)
  selectMenuIds.value = res.data.selectIds
  menuList.value = res.data.menuList
  visible.value = true
}

// 弹窗关闭的回调
const handleClose = () => {
  form.value = genderForm()
  selectMenuIds.value = []
}

const treeRef = useTemplateRef<InstanceType<typeof ElTree> | null>('treeRef')
const handleSubmit = async () => {
  // 半选的节点
  const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys() as string[]
  // 全选的节点
  const checkedKeys = treeRef.value?.getCheckedKeys() as string[]
  // 所有的节点
  form.value.menuIds = halfCheckedKeys?.concat(checkedKeys)
  console.log(halfCheckedKeys?.concat(checkedKeys))
  await roleApi.setRoleMenu(form.value)
  visible.value = false
  ElMessage.success('分配权限成功')
}

// 筛选
const filterText = ref('')
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})
const filterNode = (value: string, data: any) => {
  if (!value) return true
  return data.title.includes(value)
}

// 树形结构展开收起
const isExpand = ref(false)
// 展开/收起操作
const handleExpandChange = (isExpanded: boolean) => {
  const nodesMap = treeRef.value?.store?.nodesMap
  if (!nodesMap) return
  Object.values(nodesMap as Record<string, { expanded: boolean }>).forEach((node) => {
    node.expanded = isExpanded
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="visible" title="分配权限" width="500" @close="handleClose">
    <div class="operation">
      <el-input v-model="filterText" style="width: 240px" placeholder="请输入菜单权限名称" />
      <el-switch
        v-model="isExpand"
        inline-prompt
        active-text="展开"
        inactive-text="收起"
        @change="handleExpandChange"
      />
    </div>
    <el-tree
      ref="treeRef"
      :props="{ label: 'title', children: 'children' }"
      :data="menuList"
      node-key="id"
      show-checkbox
      :default-checked-keys="selectMenuIds"
      :filter-node-method="filterNode"
      check-strictly
    />
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.operation {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  .el-input {
    margin-right: 12px;
  }
}
</style>
