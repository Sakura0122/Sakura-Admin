import { Layout } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import style from './index.module.less'
import LogoImg from '@/assets/icons/logo.svg'
import AppMenu from '@/layouts/app-menu'
import AppTabbar from '@/layouts/app-tabbar'
import settingsStore from '@/stores/settings.ts'

const { Header, Sider, Content } = Layout

function Layouts() {
  const navigate = useNavigate()
  const collapsed = settingsStore((state) => state.collapsed)
  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <Layout className={style.layout}>
      {/* 左侧栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed} width={260}>
        {/* logo */}
        <div className={style.logo} onClick={handleLogoClick}>
          <img src={LogoImg} alt="" />
          <p>{collapsed ? '' : 'Sakura的管理系统'}</p>
        </div>

        {/* 菜单 */}
        <AppMenu />
      </Sider>

      <Layout className={style.rightLayout}>
        <Header className={style.header}>
          <AppTabbar />
        </Header>
        <Content className={style.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Layouts
