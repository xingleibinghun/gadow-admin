import { User } from '@/types'

export interface LoginParams {
  username: string
  password: string
}

export interface Login {
  access_token: string
  refresh_token: string
  user: User
}
