import { Form, Input, message, Modal, Switch, Upload } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { UserForm, UserVo } from '@/api/system/user/type.ts'
import * as React from 'react'
import { uploadApi } from '@/api/upload'
import { PlusOutlined } from '@ant-design/icons'
import userApi from '@/api/system/user'

interface UserModalProp {
  ref: React.Ref<UserModalRef>
  update: () => void
}

export interface UserModalRef {
  open: (data?: UserVo) => void
}

function UserModal({ ref, update }: UserModalProp) {
  const [visible, setVisible] = useState(false)

  const [form] = Form.useForm()
  const id = Form.useWatch('id', form)

  // 上传头像
  const [avatar, setAvatar] = useState('')
  const handleUpload = async (option: any) => {
    const file = option.file as File
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      message.error('只能上传jpg、png格式的图片')
      return false
    } else if (file.size / 1024 / 1024 > 2) {
      message.error('图片大小不能超过2M')
      return false
    }
    const res = await uploadApi(file)
    setAvatar(res.data)
  }

  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const data: UserForm = form.getFieldsValue()
      data.avatar = avatar
      data.id ? await userApi.updateUser(data) : await userApi.addUser(data)
      message.success(data.id ? '编辑用户成功' : '新增用户成功')
      update()
      setVisible(false)
    }
  }
  const handleCancel = () => {
    setVisible(false)
    setTitle('新增用户')
    setAvatar('')
  }

  const [title, setTitle] = useState('新增用户')
  const open = (data?: UserVo) => {
    form.resetFields()
    if (data) {
      form.setFieldsValue(data)
      setAvatar(data.avatar)
      setTitle('编辑用户')
    }
    setVisible(true)
  }
  useImperativeHandle(ref, () => ({ open }))

  return (
    <Modal title={title} open={visible} onOk={handleOk} onCancel={handleCancel}>
      <Form layout="horizontal" form={form} labelCol={{ span: 4 }}>
        <Form.Item<UserForm> name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item<UserForm>
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 4, message: '用户名不能小于4位' },
            { max: 16, message: '用户名不能大于16位' },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        {!id && (
          <Form.Item<UserForm>
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码不能小于6位' },
              { max: 16, message: '密码不能大于16位' },
            ]}
          >
            <Input placeholder="请输入密码" />
          </Form.Item>
        )}
        <Form.Item<UserForm> label="姓名" name="name">
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item<UserForm> label="手机号" name="phone">
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item<UserForm> label="头像">
          <Upload listType="picture-card" showUploadList={false} customRequest={handleUpload}>
            {avatar ? <img src={avatar} alt="" style={{ width: '102px', height: '102px' }} /> : <PlusOutlined />}
          </Upload>
        </Form.Item>
        <Form.Item<UserForm> label="描述" name="description">
          <Input placeholder="请输入用户描述" />
        </Form.Item>
        <Form.Item<UserForm>
          name="status"
          label="状态"
          valuePropName="checked"
          getValueFromEvent={(checked) => (checked ? 1 : 0)}
          getValueProps={(value) => ({ checked: value === 1 })}
        >
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserModal
