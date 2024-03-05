import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException
} from '@nestjs/common'
import { In } from 'typeorm'
import { Reflector } from '@nestjs/core'
import { RoleService } from '@/modules/role/role.service'
import { REQUIRE_PERMISSION_KEY } from '@/decorators/require-permission.decorator'
import { UserService } from '@/modules/user/user.service'
import { RedisService } from '@/modules/common/redis/redis.service'
import { deduplication } from '@/common/utils'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly redisService: RedisService,
    @Inject(RoleService)
    private readonly roleService: RoleService,
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 要求权限
    const requirePermissions = this.reflector.getAllAndOverride<string[]>(
      REQUIRE_PERMISSION_KEY,
      [context.getHandler(), context.getClass()]
    )

    // 无需权限
    if (!requirePermissions?.length) return true

    const { user } = context.switchToHttp().getRequest()
    if (!user) throw new UnauthorizedException('用户未登录')

    // 用户权限
    let permissions = await this.redisService.listGet(
      `user_${user.userId}_permissions`
    )
    /**
     * 无缓存
     */
    if (permissions?.length === 0) {
      const roles = await this.roleService.findAll({
        id: In(user.roles ?? [])
      })
      permissions = deduplication(
        roles.reduce((acc, role) => {
          acc.push(...role.permissions.map(permission => permission.name))
          return acc
        }, [])
      )
      // 更新 redis
      this.redisService.listSet(`user_${user.userId}_permissions`, permissions)
    }

    /**
     * 用户是否有要求的权限
     *   优化: 优化为对象支持 O(1) 查找复杂度
     */
    const hasPermissions = requirePermissions.every(permission =>
      permissions.includes(permission)
    )
    if (!hasPermissions) throw new UnauthorizedException('无接口权限')

    return true
  }
}
