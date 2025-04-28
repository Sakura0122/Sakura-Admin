import { FC, PropsWithChildren } from 'react'
import { Navigate, useRouteLoaderData } from 'react-router-dom'
import { UserInfoVo } from '@/api/system/user/type.ts'
import * as React from 'react'

interface PermissionProps {
  name?: string
}

const Permission: FC<PropsWithChildren<PermissionProps>> = (props) => {
  const loaderData = useRouteLoaderData('root') as UserInfoVo
  const { children, name } = props
  if (!name || loaderData?.menus?.includes(name)) {
    return <>{children}</>
  }
  return <Navigate to="/403" />
}

export default Permission
