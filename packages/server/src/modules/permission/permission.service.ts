import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Permission } from '@/entities'

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>
  ) {}

  findAll(where?, payload?): Promise<Permission[]> {
    return this.permissionRepository.find({
      where,
      ...payload
    })
  }

  async findOne(where, payload?): Promise<Permission> {
    return this.permissionRepository.findOne({
      where,
      ...payload
    })
  }

  async create(permission): Promise<Permission> {
    const isExisted = Boolean(
      await this.permissionRepository.findOne({
        where: {
          name: permission.name
        }
      })
    )
    if (isExisted) throw new BadRequestException('权限已存在')
    return this.permissionRepository.save(new Permission(permission))
  }

  async update(id: number, permission): Promise<Permission> {
    const existPermission = await this.permissionRepository.findOneBy({ id })
    if (!existPermission) throw new BadRequestException('权限不存在')
    const updatePermission = this.permissionRepository.merge(
      existPermission,
      permission
    )
    return this.permissionRepository.save(updatePermission)
  }

  async remove(id: number): Promise<void> {
    const existPermission = await this.permissionRepository.findOneBy({ id })
    if (!existPermission) throw new BadRequestException('权限不存在')
    await this.permissionRepository.remove(existPermission)
  }
}
