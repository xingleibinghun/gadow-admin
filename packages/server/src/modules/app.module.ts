import { Module } from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { AllExceptionsFilter } from '@/helpers/exception.filter'
import { TransformInterceptor } from '@/interceptors/transform.interceptor'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { PermissionGuard } from '@/guards/permission.guard'
import TypeOrmModule from '@/modules/common/typeorm/typeorm.module'
import ConfigModule from '@/modules/common/config/config.module'
import { RedisModule } from '@/modules/common/redis/redis.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { UserModule } from '@/modules/user/user.module'
import { RoleModule } from '@/modules/role/role.module'
import { PermissionModule } from '@/modules/permission/permission.module'

@Module({
  imports: [
    TypeOrmModule,
    ConfigModule,
    RedisModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule
  ],
  controllers: [],
  providers: [
    /**
     * 过滤器
     */
    // 异常
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    /**
     * 拦截器
     */
    // 请求成功
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    /**
     * 守卫
     */
    // 登录授权
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    // 权限认证
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
  ]
})
export class AppModule {}
