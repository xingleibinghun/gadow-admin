import React, { FC, useState, useEffect, useCallback } from 'react'
import { Form, Input, Space, Button, FormProps, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { login } from '@/store/userReducer'
import { useNavigate } from 'react-router-dom'
import { signIn } from '@/services/auth'
import styles from './index.less'

interface FormData {
  username: string
  password: string
}

const initialValues: FormData = {
  username: '',
  password: ''
}

const Login: FC = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [, setUser] = useLocalStorageState('user')
  const [form] = Form.useForm()
  const [rules] = useState({
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }]
  })

  // 检测登录凭证
  useEffect(() => {
    if (user.userId && user.access_token) {
      navigate('/', {
        replace: true
      })
    }
  }, [])

  const handleFinish: FormProps['onFinish'] = useCallback(
    async (values: FormData) => {
      const { data } = await signIn(values)
      const { access_token, refresh_token, user } = data
      await dispatch(login(user))
      setUser({
        access_token,
        refresh_token
      })
      message.success('登录成功')
      navigate('/', {
        replace: true
      })
    },
    []
  )

  return (
    <div className={styles.container}>
      <Space direction="vertical" align="center" size="large">
        <div className={styles.title}>Gadow Admin</div>
        <Form
          name="login"
          form={form}
          initialValues={initialValues}
          autoComplete="off"
          className={styles['form']}
          size="large"
          onFinish={handleFinish}
        >
          <Form.Item name="username" rules={rules.username}>
            <Input placeholder="用户名" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item name="password" rules={rules.password}>
            <Input.Password placeholder="密码" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" size="large" block htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  )
}

export default Login
