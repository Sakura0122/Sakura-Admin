import style from './index.module.less'
import { Breadcrumb, Button, Dropdown, Space } from 'antd'
import { DownOutlined, FullscreenOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SyncOutlined } from '@ant-design/icons'
import settingsStore from '@/stores/settings.ts'
import { useMatches, useNavigate } from 'react-router-dom'
import userStore from '@/stores/user.ts'

function AppTabbar() {
  const { collapsed, setCollapsed } = settingsStore()
  const { userinfo, reset } = userStore()
  const navigate = useNavigate()

  const matches = useMatches()

  const breadList = [
    {
      title: '首页',
      href: '/',
    },
    {
      title: '应用中心',
      href: '/app',
    },
    {
      title: '应用列表',
      href: '/app/list',
    },
    {
      title: '应用详情',
      href: '/app/detail',
    },
  ]

  // 全屏按钮点击的回调
  const handleFullScreen = () => {
    // document.fullscreenElement 是一个 DOM 属性，如果当前处于全屏模式，则返回当前处于全屏模式的 Element 对象；否则返回 null
    const full = document.fullscreenElement
    // 切换为全屏模式
    if (!full) {
      // 文档根节点的方法requestFullscreen,实现全屏模式
      document.documentElement.requestFullscreen()
    } else {
      // 退出全屏模式
      document.exitFullscreen()
    }
  }

  // 退出登录
  const handleLogout = () => {
    reset()
    navigate('/login')
  }

  return (
    <div className={style.tabbar}>
      <div className="left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Breadcrumb items={breadList} />
      </div>
      <div className="right">
        <Button size="small" shape="circle" icon={<SyncOutlined />}></Button>
        <Button size="small" shape="circle" icon={<FullscreenOutlined />} onClick={handleFullScreen}></Button>
        <img className="avatar" src={userinfo.avatar || undefined} alt="" />
        <Dropdown
          className="dropdown"
          menu={{ items: [{ key: '1', label: <div onClick={handleLogout}>退出登录</div> }] }}
        >
          <Space>
            {userinfo.name}
            <DownOutlined style={{ fontSize: '12px' }} />
          </Space>
        </Dropdown>
      </div>
    </div>
  )
}

export default AppTabbar
