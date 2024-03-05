import { SetMetadata } from '@nestjs/common'

export const NO_LOGIN_REQUIRED_KEY = 'no-login-required'
/**
 * 无需登录鉴权
 */
export const NoLoginRequired = () => SetMetadata(NO_LOGIN_REQUIRED_KEY, true)
