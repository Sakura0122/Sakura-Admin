import { ConfigProvider, App as AntdApp } from 'antd'
import { RouterProvider } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import router from '@/router'
import AntdGlobal from '@/utils/AntdGlobal.ts'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router}></RouterProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
