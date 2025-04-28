import { Button, DatePicker, Form, Input, Modal, Space, Table, TableProps, Tag } from 'antd'
import { UserVo } from '@/api/system/user/type.ts'
import userApi from '@/api/system/user'
import useTable from '@/hooks/useTable.ts'
import UserModal, { UserModalRef } from '@/views/system/user/components/user-modal.tsx'
import { useRef } from 'react'
import AuthButton from '@/components/auth-button'
import SetRoleModal, { SetRoleModalRef } from '@/views/system/user/components/set-role-modal.tsx'

function User() {
  const [form] = Form.useForm()
  const { list, pagination, search, refresh } = useTable({
    api: userApi.getUserData,
    form,
    formatParams: (params) => {
      return {
        keyword: params.keyword,
        beginTime: params.time?.[0]?.format('YYYY-MM-DD') || undefined,
        endTime: params.time?.[1]?.format('YYYY-MM-DD') || undefined,
      }
    },
  })

  const columns: TableProps<UserVo>['columns'] = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (value) => {
        return <img src={value} alt="" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (value: 0 | 1) => {
        return <Tag color={value === 1 ? 'success' : 'error'}>{value === 1 ? '正常' : '禁用'}</Tag>
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          <AuthButton link auth={'sys.user.set_role'} onClick={() => handleSetUserRole(record.id)}>
            分配角色
          </AuthButton>
          <AuthButton link auth={'sys.user.update'} onClick={() => handleUpdate(record)}>
            编辑
          </AuthButton>
          <AuthButton link auth={'sys.user.delete'} onClick={() => handleDelete(record.id)}>
            删除
          </AuthButton>
        </Space>
      ),
    },
  ]

  const handleSetUserRole = (id: string) => {
    setRoleModalRef.current?.open(id)
  }
  const handleUpdate = (row: UserVo) => {
    userModalRef.current?.open(row)
  }
  const handleAdd = () => {
    userModalRef.current?.open()
  }
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '提示',
      content: '确定删除吗?',
      onOk: async () => {
        await userApi.deleteUser(id)
        await refresh()
      },
    })
  }

  const userModalRef = useRef<UserModalRef>(null)
  const setRoleModalRef = useRef<SetRoleModalRef>(null)

  return (
    <div className="sakura-card">
      <div className="header">
        <div className="title">用户管理</div>
      </div>
      <div className="tools">
        <AuthButton type="primary" auth={'sys.user.add'} onClick={handleAdd}>
          新增
        </AuthButton>
        <Form layout="inline" form={form}>
          <Form.Item name="time" label="创建时间">
            <DatePicker.RangePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="keyword" label="关键字">
            <Input placeholder="请输入用户名、姓名、手机号" allowClear style={{ width: 230 }} />
          </Form.Item>
          <Form.Item>
            <AuthButton type="primary" auth={'sys.user.query'} onClick={search}>
              查询
            </AuthButton>
          </Form.Item>
        </Form>
      </div>
      <div className="content">
        <Table<UserVo> columns={columns} dataSource={list} pagination={pagination} rowKey="id" />
      </div>
      <UserModal ref={userModalRef} update={refresh} />
      <SetRoleModal ref={setRoleModalRef} update={refresh} />
    </div>
  )
}

export default User
