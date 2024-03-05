import { Code } from '@/types/enums'

type ErrorMap = Partial<{
  // eslint-disable-next-line
  [Key in `${Code}`]: string
}>

/**
 * 错误码到错误信息的映射
 *   BadRequest     10100
 *   database       102**
 */
export const ERROR_MESSAGE_MAP: ErrorMap = {
  [Code.AuthError]: '登录验证失败'
}
