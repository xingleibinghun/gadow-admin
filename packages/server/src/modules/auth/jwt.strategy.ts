import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

/**
 * 登录鉴权
 *   根据请求头 Authorization 登录鉴权(除了登录接口、路由白名单中的路由都会走这个鉴权)
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  /**
   * @param payload
   * @returns Control 中 request.user
   */
  async validate(payload: any) {
    return payload
  }
}
