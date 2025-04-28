import * as React from 'react'
import { JSX, Suspense } from 'react'
import Permission from '@/router/Permission.tsx'
import { Spin } from 'antd'

const LazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>, name?: string) => {
  return (
    <Permission name={name}>
      <Suspense
        fallback={
          <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            加载中...
          </Spin>
        }
      >
        <Component />
      </Suspense>
    </Permission>
  )
}

export default LazyLoad
