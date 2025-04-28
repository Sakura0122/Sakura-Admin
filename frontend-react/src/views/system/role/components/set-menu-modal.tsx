import { Input, message, Modal, Switch, Tree, TreeProps } from 'antd'
import roleApi from '@/api/system/role'
import { useImperativeHandle, useState } from 'react'
import * as React from 'react'
import { MenuList, roleMenuForm } from '@/api/system/role/type.ts'
import { UserVo } from '@/api/system/user/type.ts'
import { recursionGetId } from '@/utils/utils.ts'

interface SetMenuModalProp {
  ref: React.Ref<SetMenuModalRef>
  update: () => void
}

export interface SetMenuModalRef {
  open: (id: string) => void
}

function SetMenuModal({ ref, update }: SetMenuModalProp) {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState<roleMenuForm>({
    roleId: '',
    menuIds: [],
  })
  // 全部菜单
  const [menuList, setMenuList] = useState<MenuList[]>([])
  // 角色已有菜单
  const [selectMenuIds, setSelectMenuIds] = useState<string[]>([])

  // 处理筛选
  const [filterText, setFilterText] = useState('')
  const handleFilterChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterText(e.target.value)
  }

  const filterTreeNode: TreeProps['filterTreeNode'] = (node) => {
    return (node.title?.toString() ?? '').includes(filterText)
  }

  // 展开/收起所有
  const [isExpand, setIsExpand] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const handleExpandChange = (expand: boolean) => {
    if (expand) {
      setExpandedKeys(recursionGetId(menuList))
    } else {
      setExpandedKeys([])
    }
    setIsExpand(expand)
  }

  // 提交角色权限
  const handleOk = async () => {
    await roleApi.setRoleMenu(form)
    message.success('分配权限成功')
    update()
    setVisible(false)
  }
  // 关闭弹窗
  const handleCancel = () => {
    setFilterText('')
    setExpandedKeys([])
    setSelectMenuIds([])
    setIsExpand(false)
    setForm({ roleId: '', menuIds: [] })
    setVisible(false)
  }

  // 点击复选框
  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    if (!Array.isArray(checkedKeys)) {
      setForm({ ...form, menuIds: (checkedKeys.checked as string[]).concat(checkedKeys.halfChecked as string[]) })
    }
  }
  // 点击展开图标
  const onExpand: TreeProps['onExpand'] = (expandedKeys) => {
    setExpandedKeys(expandedKeys as string[])
  }

  const open = async (id: string) => {
    form.roleId = id
    const res = await roleApi.getRoleMenu(id)
    setMenuList(res.data.menuList)
    setSelectMenuIds(res.data.selectIds)
    setForm({ ...form, menuIds: res.data.selectIds })
    setVisible(true)
  }
  useImperativeHandle(ref, () => ({ open }))

  return (
    <Modal title="分配权限" open={visible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <Input
          value={filterText}
          onChange={handleFilterChange}
          placeholder="请输入菜单权限名称"
          style={{ width: 240, marginRight: 12 }}
        />
        <Switch checked={isExpand} onChange={handleExpandChange} checkedChildren="展开" unCheckedChildren="收起" />
      </div>
      <Tree
        checkable
        checkStrictly
        fieldNames={{ title: 'title', key: 'id', children: 'children' }}
        treeData={menuList as []}
        defaultExpandAll={isExpand}
        defaultCheckedKeys={selectMenuIds}
        expandedKeys={expandedKeys}
        filterTreeNode={filterTreeNode}
        selectable={false}
        onCheck={onCheck}
        onExpand={onExpand}
      />
    </Modal>
  )
}

export default SetMenuModal
