export interface User {
  userId: number
  username: string
  avatar: string
  sex: 0 | 1 | 2
  email: string
  roles: number[]
  isActive: boolean
  isBanned: boolean
}
