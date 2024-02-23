import { RouterObjectExtra } from '../types'

const userModule: RouterObjectExtra = {
  id: 'User',
  path: 'user',
  meta: {
    label: '用户'
  },
  children: [
    {
      id: 'User.UserManage',
      path: 'userManage',
      meta: {
        label: '用户管理'
      },
      children: [
        {
          id: 'User.UserManage.CreateUser',
          path: 'createUser',
          component: () => import('@/pages/User/UserManage/CreateUser'),
          meta: {
            label: '创建用户'
          }
        }
      ]
    }
  ]
}

export default userModule
