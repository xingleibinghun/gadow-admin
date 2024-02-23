import request from '@/services/request'
import { Response } from '@/services/typings'
import { UserInfo } from './index.d'

/**
 * 获取当前用户
 */
export function getProfile() {
  return request.request<null, Response<UserInfo>>({
    method: 'get',
    url: '/user/profile'
  })
}
