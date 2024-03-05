import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException
} from '@nestjs/common'
import { UserService } from '@/modules/user/user.service'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '@/entities'
import { RoleService } from '@/modules/role/role.service'
import { ACCESS_TOKEN_TIMEOUT, REFRESH_TOKEN_TIMEOUT } from '@/config'
import { RedisService } from '@/modules/common/redis/redis.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(RoleService)
    private readonly roleService: RoleService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(
      {
        username
      },
      {
        relations: ['roles']
      }
    )
    // 密码校验
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user
        return rest
      }
    }
    return null
  }

  async signIn(user: User) {
    const accessToken = this.jwtService.sign(
      {
        userId: user.userId,
        username: user.username,
        roles: user.roles?.map(role => role.id)
      },
      {
        expiresIn: ACCESS_TOKEN_TIMEOUT
      }
    )
    const refreshToken = this.jwtService.sign(
      {
        userId: user.userId
      },
      {
        expiresIn: REFRESH_TOKEN_TIMEOUT
      }
    )
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user
    }
  }

  async refresh(refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken)
      const user = await this.userService.findUserById(data.userId)
      const accessToken = this.jwtService.sign(
        {
          userId: user.userId,
          username: user.username,
          roles: user.roles?.map(role => role.id)
        },
        {
          expiresIn: ACCESS_TOKEN_TIMEOUT
        }
      )
      const refreshTokenNew = this.jwtService.sign(
        {
          userId: user.userId
        },
        {
          expiresIn: REFRESH_TOKEN_TIMEOUT
        }
      )

      return {
        access_token: accessToken,
        refresh_token: refreshTokenNew
      }
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录')
    }
  }
}
