import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
 * 获取用户信息/某个用户信息字段
 */
export const User = createParamDecorator(
  /**
   *   TODO
   *     - field 支持字段链
   * @param field 字段名
   * @param ctx
   */
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const { user } = request

    return field ? user && user[field] : user
  }
)
