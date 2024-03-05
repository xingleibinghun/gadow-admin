import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '@/modules/user/user.module'
import { UserService } from '@/modules/user/user.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { RoleModule } from '@/modules/role/role.module'
import { RoleService } from '@/modules/role/role.service'
import { TOKEN_TIMEOUT } from '@/config'

@Module({
  imports: [
    UserModule,
    RoleModule,
    // 注册默认策略
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JWT
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: TOKEN_TIMEOUT }
        }
      },
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, RoleService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
