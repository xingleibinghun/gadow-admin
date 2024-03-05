import { User } from '@/entities'

/**
 * 允许更新的用户字段
 */
export type UpdateUserFields = 'username' | 'email' | 'sex' | 'avatar' | 'roles'

export type UpdateUser = Pick<Partial<User>, UpdateUserFields>
