import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { NO_LOGIN_REQUIRED_KEY } from '@/decorators/no-login-required.decorator'

/**
 * 拓展 jwt 守卫
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    /**
     * 无需登录鉴权的路由
     */
    const noLoginRequired = this.reflector.getAllAndOverride<boolean>(
      NO_LOGIN_REQUIRED_KEY,
      [context.getHandler(), context.getClass()]
    )
    if (noLoginRequired) return true

    return super.canActivate(context)
  }

  handleRequest(err, user) {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
