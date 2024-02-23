import { RouterObjectExtra } from '@/router/types'
import Layout from '@/layout'
import { userModule } from '@/router/modules'
import React from 'react'

export const ROUTER_CONFIG_VISIBLE: RouterObjectExtra[] = [
  {
    id: '/',
    path: '/',
    element: <Layout />,
    children: [
      {
        id: 'Home',
        index: true,
        component: () => import('@/pages/Home'),
        meta: {
          label: '主页',
          requireLogin: true,
          permissions: ['HomePermission', 'HomePermissionList']
        }
      },
      userModule,
      {
        id: 'About',
        path: 'about',
        component: () => import('@/pages/About'),
        meta: {
          label: '关于'
        }
      }
    ]
  }
]

const ROUTER_CONFIG_HIDDEN: RouterObjectExtra[] = [
  {
    id: 'Login',
    path: 'login',
    component: () => import('@/pages/Login'),
    meta: {
      label: '登录'
    }
  },
  {
    id: '404',
    path: '*',
    component: () => import('@/pages/404'),
    meta: {
      label: '404'
    }
  }
]

export const ROUTER_CONFIG: RouterObjectExtra[] =
  ROUTER_CONFIG_VISIBLE.concat(ROUTER_CONFIG_HIDDEN)
