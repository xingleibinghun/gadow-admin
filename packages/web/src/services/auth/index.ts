import request from '@/services/request'
import { Response } from '@/services/typings'
import store from '@/store'
import { Login, LoginParams } from './index.d'

/**
 * 登录
 */
export function signIn(body: LoginParams) {
  return request.request<null, Response<Login>>({
    method: 'post',
    url: '/auth/signin',
    data: body
  })
}

/**
 * 刷新 token
 */
export function refreshToken() {
  const refreshToken = store.getState().user?.refresh_token
  return request.request<null, Response<Login>>({
    method: 'post',
    url: '/auth/refresh',
    data: {
      refresh_token: refreshToken
    }
  })
}
