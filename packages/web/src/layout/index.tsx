import React from 'react'
import { Outlet, useNavigation, useNavigate } from 'react-router-dom'
import { Layout, Menu, Space, Tooltip } from 'antd'
import type { MenuProps } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/hooks'
import { logout } from '@/store/userReducer'
import LOGO from '@/assets/images/logo.png'

import { useMenus } from './common'
import GlobalSpinner from './globalSpinner'
import styles from './index.less'

const { Header, Content, Sider } = Layout

const BaseHeader: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', {
      replace: true
    })
  }

  return (
    <Header className={styles.header}>
      <Space size="middle" align="center">
        <img className={styles.logo} src={LOGO} />
        <h1 className={styles.title}>Gadow Admin</h1>
      </Space>
      <Space className={styles.actions} size="middle">
        <Tooltip title="登出">
          <LoginOutlined onClick={handleLogout} />
        </Tooltip>
      </Space>
    </Header>
  )
}

const BaseSider: React.FC = () => {
  const navigate = useNavigate()
  const { menus, openKeys, selectedKeys, setOpenKeys } = useMenus()

  const handleNavigate: MenuProps['onClick'] = ({ key }) => {
    if (!key) return
    navigate(key)
  }

  return (
    <Sider width={200}>
      <Menu
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onClick={handleNavigate}
        onOpenChange={setOpenKeys}
        mode="inline"
        items={menus}
        className={styles.menus}
      />
    </Sider>
  )
}

const BaseLayout: React.FC = () => {
  const navigation = useNavigation()

  return (
    <div>
      <Layout className={styles.container}>
        <BaseHeader />
        <Layout>
          <BaseSider />
          <Layout style={{ padding: '24px' }}>
            <Content className={styles['site-layout-content']}>
              {navigation.state === 'loading' && <GlobalSpinner />}
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default BaseLayout
