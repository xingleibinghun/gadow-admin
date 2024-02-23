import { User } from '@/types'

export interface UserState extends User {
  access_token: string
  refresh_token: string
}

export interface UserReducer {}
