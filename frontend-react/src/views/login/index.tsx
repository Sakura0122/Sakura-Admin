import { Button, Checkbox, Form, FormProps, Input } from 'antd'
import SakuraIcon from '@/components/sakura-icon'
import style from './index.module.less'
import { LoginDto } from '@/api/system/auth/type.ts'
import { useEffect, useState } from 'react'
import authApi from '@/api/system/auth'
import storage from '@/utils/storage.ts'
import { useNavigate } from 'react-router-dom'
import { message } from '@/utils/AntdGlobal.ts'
import { setToken } from '@/utils/token.ts'

function Login() {
  const navigate = useNavigate()

  // 登录表单
  const [form] = useState<LoginDto>({
    username: storage.get('username'),
    password: storage.get('password'),
    remember: storage.get('remember') || false,
    key: crypto.randomUUID(),
    code: '',
  })

  // 获取验证码
  const [captchaImg, setCaptchaImg] = useState('')
  const getCodeData = async () => {
    const res = await authApi.getCaptcha(form.key)
    setCaptchaImg(res.data)
  }

  // 点击登录
  const onFinish: FormProps<LoginDto>['onFinish'] = async (values) => {
    try {
      const res = await authApi.login({ ...values, key: form.key })
      setToken(res.data)
      if (values.remember) {
        storage.set('username', values.username)
        storage.set('password', values.password)
        storage.set('remember', values.remember)
      } else {
        storage.remove('username')
        storage.remove('password')
        storage.remove('remember')
      }
      message.success('登录成功')
      navigate('/')
    } catch (e) {
      getCodeData()
    }
  }

  useEffect(() => {
    getCodeData()
  }, [])

  return (
    <div className={style.login}>
      <div className="shadow-box"></div>
      <div className="container shadow-xl">
        <div className="backdrop"></div>
        <div className="header">
          <div className="icon-box rounded-full">
            <SakuraIcon name="logo" width="38px" height="38px" />
          </div>
        </div>
        <div className="h1">欢迎回来</div>
        <div className="h2">请输入你的登录信息</div>
        <Form layout="vertical" onFinish={onFinish} initialValues={form}>
          <Form.Item<LoginDto>
            label="用户名"
            name="username"
            validateTrigger="onBlur"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item<LoginDto>
            label="密码"
            name="password"
            validateTrigger="onBlur"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item<LoginDto>
            label="验证码"
            name="code"
            validateTrigger="onBlur"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <div className="captcha">
              <Input placeholder="请输入验证码" />
              <img src={captchaImg || undefined} alt="" onClick={getCodeData} />
            </div>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="check-box">记住密码</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="guide-text">by sakura</div>
      </div>
    </div>
  )
}

export default Login
