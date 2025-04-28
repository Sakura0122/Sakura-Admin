import { Form, Input, message, Modal, Switch, Upload } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { UserForm, UserVo } from '@/api/system/user/type.ts'
import * as React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { RoleForm, RoleVo } from '@/api/system/role/type.ts'
import roleApi from '@/api/system/role'

interface RoleModalProp {
  ref: React.Ref<RoleModalRef>
  update: () => void
}

export interface RoleModalRef {
  open: (data?: RoleVo) => void
}

function RoleModal({ ref, update }: RoleModalProp) {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const data: RoleForm = form.getFieldsValue()
      data.id ? await roleApi.updateRole(data) : await roleApi.addRole(data)
      message.success(data.id ? '编辑角色成功' : '新增角色成功')
      update()
      setVisible(false)
    }
  }
  const handleCancel = () => {
    setVisible(false)
    setTitle('新增角色')
  }

  const [title, setTitle] = useState('新增角色')
  const open = (data?: RoleVo) => {
    form.resetFields()
    if (data) {
      form.setFieldsValue(data)
      setTitle('编辑角色')
    }
    setVisible(true)
  }
  useImperativeHandle(ref, () => ({ open }))

  return (
    <Modal title={title} open={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form layout="horizontal" form={form} labelCol={{ span: 4 }}>
        <Form.Item<RoleForm> name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item<RoleForm> label="角色名称" name="roleName" rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item<RoleForm> label="角色编码" name="roleCode" rules={[{ required: true, message: '请输入角色编码' }]}>
          <Input placeholder="请输入角色编码" />
        </Form.Item>
        <Form.Item<RoleForm> label="描述" name="description">
          <Input placeholder="请输入用户描述" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RoleModal
