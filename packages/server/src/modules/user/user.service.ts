import { Injectable, BadRequestException, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '@/entities'
import { pickValues } from '@/common/utils'
import { RoleService } from '@/modules/role/role.service'
import { UpdateUserFields, UpdateUser } from './types'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(RoleService)
    private readonly roleService: RoleService
  ) {}

  findAll(payload?): Promise<User[]> {
    return this.usersRepository.find(payload)
  }

  findOne(where, payload?): Promise<User> {
    return this.usersRepository.findOne({
      where,
      ...payload
    })
  }

  findUserById(id: number, payload?): Promise<User> {
    return this.findOne(
      {
        userId: id
      },
      payload
    )
  }

  async create(user): Promise<void> {
    const isExisted = Boolean(
      await this.findOne({
        username: user.username
      })
    )
    if (isExisted) throw new BadRequestException('用户已存在')

    // 角色
    let roles = []
    if (user.roles?.length) {
      roles = await this.roleService.findAll({
        id: In(user.roles)
      })
      if (roles?.length === 0) throw new BadRequestException('角色无效')
    }

    // 密码
    const saltRounds = 10
    const hash = await bcrypt.hash(user.password, saltRounds)

    await this.usersRepository.save(
      new User({
        ...user,
        roles,
        password: hash,
        isAdmin: false
      })
    )
  }

  /**
   * 更新用户信息
   * @param id
   * @param user 新用户信息
   * @param fields 要更新的信息字段集合
   */
  async update(id: number, user, fields?: UpdateUserFields[]): Promise<User> {
    const existUser = await this.usersRepository.findOneBy({ userId: id })
    if (!existUser) throw new BadRequestException('用户不存在')

    // 允许更新的用户字段
    const updateFields = pickValues(user, fields) as UpdateUser
    if (user.roles?.length) {
      const roles = await this.roleService.findAll({
        id: In(user.roles)
      })
      if (roles?.length === 0) throw new BadRequestException('角色无效')
      updateFields.roles = roles
    }

    const updateUser = this.usersRepository.merge(existUser, updateFields, {
      isAdmin: false
    })
    return this.usersRepository.save(updateUser)
  }

  async remove(id: number): Promise<void> {
    const existUser = await this.usersRepository.findOneBy({
      userId: id,
      isAdmin: false
    })
    if (!existUser) throw new BadRequestException('用户不存在')
    await this.usersRepository.remove(existUser)
  }

  /**
   * 管理员相关
   */
}
