import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Role } from '@/entities'
import { PermissionService } from '@/modules/permission/permission.service'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @Inject(PermissionService)
    private permissionService: PermissionService
  ) {}

  findAll(where?, payload?): Promise<Role[]> {
    return this.roleRepository.find({
      where,
      relations: ['permissions'],
      ...payload
    })
  }

  async findOne(where, payload?): Promise<Role> {
    return this.roleRepository.findOne({
      where,
      relations: ['permissions'],
      ...payload
    })
  }

  async create(role): Promise<void> {
    const isExisted = Boolean(
      await this.roleRepository.findOne({
        where: {
          name: role.name
        }
      })
    )
    if (isExisted) throw new BadRequestException('角色已存在')
    const permissions = await this.permissionService.findAll({
      id: In(role.permissions)
    })
    if (permissions?.length === 0) {
      throw new BadRequestException('权限无效')
    }
    await this.roleRepository.save(
      new Role({
        ...role,
        permissions
      })
    )
  }

  async update(id: number, role): Promise<Role> {
    const existRole = await this.roleRepository.findOneBy({ id })
    if (!existRole) throw new BadRequestException('角色不存在')
    const updateRole = this.roleRepository.merge(existRole, role)
    return this.roleRepository.save(updateRole)
  }

  async remove(id: number): Promise<void> {
    const existRole = await this.roleRepository.findOneBy({ id })
    if (!existRole) throw new BadRequestException('角色不存在')
    await this.roleRepository.remove(existRole)
  }
}
