import { Form, Input, message, Modal, Radio, Switch } from 'antd'
import { useImperativeHandle, useState } from 'react'
import * as React from 'react'
import { MenuForm, MenuVo } from '@/api/system/menu/type.ts'
import menuApi from '@/api/system/menu'

interface MenuModalProp {
  ref: React.Ref<MenuModalRef>
  update: () => void
}

export interface MenuModalRef {
  addOpen: (parentId: string) => void
  editOpen: (data: MenuVo) => void
}

function MenuModal({ ref, update }: MenuModalProp) {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm<MenuForm>()
  const type = Form.useWatch('type', form)
  const [title, setTitle] = useState('新增菜单')

  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const data: MenuForm = form.getFieldsValue()
      data.id ? await menuApi.updateMenu(data) : await menuApi.addMenu(data)
      message.success(data.id ? '编辑菜单成功' : '新增菜单成功')
      update()
      setVisible(false)
    }
  }
  const handleCancel = () => {
    setVisible(false)
    setTitle('新增菜单')
  }

  const addOpen = (parentId: string) => {
    form.resetFields()
    form.setFieldsValue({ parentId })
    setVisible(true)
  }
  const editOpen = (data: MenuVo) => {
    form.resetFields()
    form.setFieldsValue(data)
    setTitle('编辑菜单')
    setVisible(true)
  }
  useImperativeHandle(ref, () => ({ addOpen, editOpen }))

  return (
    <Modal title={title} open={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form layout="horizontal" form={form} labelCol={{ span: 4 }} initialValues={{ type: 1 }}>
        <Form.Item<MenuForm> name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item<MenuForm> name="parentId" hidden>
          <Input />
        </Form.Item>
        <Form.Item<MenuForm> label="菜单名称" name="title" rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item<MenuForm> label="菜单类型" name="type">
          <Radio.Group
            options={[
              { value: 1, label: '菜单' },
              { value: 2, label: '按钮' },
            ]}
          />
        </Form.Item>
        {type === 1 && (
          <Form.Item<MenuForm> label="路由名称" name="component">
            <Input placeholder="请输入用户描述" />
          </Form.Item>
        )}
        {type === 2 && (
          <Form.Item<MenuForm> label="权限标识" name="perms">
            <Input placeholder="请输入权限标识" />
          </Form.Item>
        )}
        <Form.Item<MenuForm>
          label="状态"
          name="status"
          valuePropName="checked"
          getValueFromEvent={(checked) => (checked ? 1 : 0)}
          getValueProps={(value) => ({ checked: value === 1 })}
        >
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Form.Item>
        <Form.Item<MenuForm> label="排序" name="sortValue">
          <Input placeholder="请输入排序" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default MenuModal
