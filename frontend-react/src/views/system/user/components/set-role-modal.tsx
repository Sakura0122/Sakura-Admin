import { Checkbox, CheckboxProps, Divider, message, Modal } from 'antd'
import { RoleList, UserRoleForm } from '@/api/system/user/type.ts'
import * as React from 'react'
import { useImperativeHandle, useState } from 'react'
import userApi from '@/api/system/user'

interface SetRoleModalProp {
  ref: React.Ref<SetRoleModalRef>
  update: () => void
}

export interface SetRoleModalRef {
  open: (id: string) => void
}

function SetRoleModal({ ref, update }: SetRoleModalProp) {
  const [visible, setVisible] = useState(false)

  const [form, setForm] = useState<UserRoleForm>({
    userId: '',
    roleIds: [],
  })
  const [roleList, setRoleList] = useState<RoleList[]>([])

  const checkAll = roleList.length === form.roleIds.length
  const indeterminate = form.roleIds.length > 0 && form.roleIds.length < roleList.length

  const onChange = (list: string[]) => {
    setForm({ ...form, roleIds: list })
  }
  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setForm({ ...form, roleIds: e.target.checked ? roleList.map((item) => item.id) : [] })
  }

  const handleOk = async () => {
    await userApi.setUserRole(form)
    message.success('设置角色成功')
    update()
    setVisible(false)
  }
  const handleCancel = () => {
    setVisible(false)
    setForm({ userId: '', roleIds: [] })
  }

  const open = async (id: string) => {
    form.userId = id
    const res = await userApi.getUserRole(form.userId)
    setForm({ ...form, roleIds: res.data.selectIds })
    setRoleList(res.data.roleList)
    setVisible(true)
  }
  useImperativeHandle(ref, () => ({ open }))

  return (
    <Modal title="设置角色" open={visible} onOk={handleOk} onCancel={handleCancel}>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        全选
      </Checkbox>
      <Divider />
      <Checkbox.Group
        options={roleList?.map((item) => ({ label: item.roleName, value: item.id }))}
        value={form.roleIds}
        onChange={onChange}
      />
    </Modal>
  )
}

export default SetRoleModal
