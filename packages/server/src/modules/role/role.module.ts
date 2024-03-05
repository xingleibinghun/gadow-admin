import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from '@/entities'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { PermissionModule } from '@/modules/permission/permission.module'
import { PermissionService } from '@/modules/permission/permission.service'

@Module({
  imports: [PermissionModule, TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService, PermissionService],
  exports: [RoleService, PermissionService, TypeOrmModule]
})
export class RoleModule {}
