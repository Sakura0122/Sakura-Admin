import { useRouteLoaderData } from 'react-router-dom'
import { UserInfoVo } from '@/api/system/user/type.ts'
import { Button, ButtonProps } from 'antd'

type AuthButtonProps = {
  auth?: string | string[]
  link?: boolean
} & ButtonProps // 直接使用 ButtonProps 确保包含所有按钮属性

function AuthButton({ auth, link, ...rest }: AuthButtonProps) {
  const data = useRouteLoaderData('root') as UserInfoVo
  const { buttons } = data

  if (!auth) return <Button {...rest} />

  const hasAuth = Array.isArray(auth) ? auth.some((perm) => buttons.includes(perm)) : buttons.includes(auth)

  return hasAuth ? (
    link ? (
      <a {...rest} onClick={rest.onClick}>
        {rest.children}
      </a>
    ) : (
      <Button {...rest} />
    )
  ) : null
}

export default AuthButton
