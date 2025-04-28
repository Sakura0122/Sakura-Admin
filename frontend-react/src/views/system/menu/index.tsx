import { Button, Modal, Space, Table, TableProps, Tag } from 'antd'
import { useEffect, useRef, useState } from 'react'
import RoleModal, { RoleModalRef } from '@/views/system/role/components/role-modal.tsx'
import { MenuVo } from '@/api/system/menu/type.ts'
import menuApi from '@/api/system/menu'
import { transformData } from '@/utils/utils.ts'
import MenuModal, { MenuModalRef } from '@/views/system/menu/components/menu-modal.tsx'
import AuthButton from '@/components/auth-button'

function Menu() {
  const [list, setList] = useState<MenuVo[]>([])
  const getMenuData = async () => {
    const res = await menuApi.getMenuData()
    setList(transformData(res.data))
  }
  useEffect(() => {
    getMenuData()
  }, [])

  const columns: TableProps<MenuVo>['columns'] = [
    {
      title: '菜单名称',
      dataIndex: 'title',
    },
    {
      title: '路由名称',
      dataIndex: 'component',
    },
    {
      title: '权限标识',
      dataIndex: 'perms',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (value: 0 | 1) => {
        return <Tag color={value === 1 ? 'success' : 'error'}>{value === 1 ? '正常' : '禁用'}</Tag>
      },
    },
    {
      title: '排序',
      dataIndex: 'sortValue',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="middle">
          {!(record.type === 2) && (
            <AuthButton link auth={'sys.menu.add'} onClick={() => handleAdd(record.id)}>
              新增
            </AuthButton>
          )}
          <AuthButton link auth={'sys.menu.update'} onClick={() => handleUpdate(record)}>
            编辑
          </AuthButton>
          <AuthButton link auth={'sys.menu.delete'} onClick={() => handleDelete(record.id)}>
            删除
          </AuthButton>
        </Space>
      ),
    },
  ]

  const handleUpdate = (row: MenuVo) => {
    menuModalRef.current?.editOpen(row)
  }
  const handleAdd = (parentId: string) => {
    menuModalRef.current?.addOpen(parentId)
  }
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '提示',
      content: '确定删除吗?',
      onOk: async () => {
        await menuApi.deleteMenu(id)
        await getMenuData()
      },
    })
  }

  const menuModalRef = useRef<MenuModalRef>(null)

  return (
    <div className="sakura-card">
      <div className="header">
        <div className="title">菜单管理</div>
      </div>
      <div className="tools">
        <AuthButton type="primary" auth={'sys.menu.add'} onClick={() => handleAdd('0')}>
          新增
        </AuthButton>
      </div>
      <div className="content">
        <Table<MenuVo> columns={columns} dataSource={list} rowKey="id" />
      </div>
      <MenuModal ref={menuModalRef} update={getMenuData} />
    </div>
  )
}

export default Menu
