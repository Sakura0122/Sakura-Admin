import { Button, Form, Input, Modal, Space, Table, TableProps } from 'antd'
import useTable from '@/hooks/useTable.ts'
import { useRef } from 'react'
import { RoleVo } from '@/api/system/role/type.ts'
import roleApi from '@/api/system/role'
import RoleModal, { RoleModalRef } from '@/views/system/role/components/role-modal.tsx'
import AuthButton from '@/components/auth-button'
import SetMenuModal, { SetMenuModalRef } from '@/views/system/role/components/set-menu-modal.tsx'

function Role() {
  const [form] = Form.useForm()
  const { list, pagination, search, refresh } = useTable({
    api: roleApi.getRoleData,
    form,
  })

  const columns: TableProps<RoleVo>['columns'] = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          <AuthButton link auth={'sys.role.set_menu'} onClick={() => handleSetMenu(record.id)}>
            分配权限
          </AuthButton>
          <AuthButton link auth={'sys.role.update'} onClick={() => handleUpdate(record)}>
            编辑
          </AuthButton>
          <AuthButton link auth={'sys.role.delete'} onClick={() => handleDelete(record.id)}>
            删除
          </AuthButton>
        </Space>
      ),
    },
  ]

  const handleSetMenu = (id: string) => {
    setMenuModalRef.current?.open(id)
  }
  const handleUpdate = (row: RoleVo) => {
    roleModalRef.current?.open(row)
  }
  const handleAdd = () => {
    roleModalRef.current?.open()
  }
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '提示',
      content: '确定删除吗?',
      onOk: async () => {
        await roleApi.deleteRole(id)
        await refresh()
      },
    })
  }

  const roleModalRef = useRef<RoleModalRef>(null)
  const setMenuModalRef = useRef<SetMenuModalRef>(null)

  return (
    <div className="sakura-card">
      <div className="header">
        <div className="title">角色管理</div>
      </div>
      <div className="tools">
        <AuthButton type="primary" auth={'sys.role.add'} onClick={handleAdd}>
          新增
        </AuthButton>
        <Form layout="inline" form={form}>
          <Form.Item name="keyword" label="关键字">
            <Input placeholder="请输入角色名称、编码" allowClear />
          </Form.Item>
          <Form.Item>
            <AuthButton type="primary" auth={'sys.role.query'} onClick={search}>
              查询
            </AuthButton>
          </Form.Item>
        </Form>
      </div>
      <div className="content">
        <Table<RoleVo> columns={columns} dataSource={list} pagination={pagination} rowKey="id" />
      </div>
      <RoleModal ref={roleModalRef} update={refresh} />
      <SetMenuModal ref={setMenuModalRef} update={refresh} />
    </div>
  )
}

export default Role
