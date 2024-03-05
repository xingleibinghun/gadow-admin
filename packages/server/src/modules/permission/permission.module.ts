import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from '@/entities'
import { PermissionController } from './permission.controller'
import { PermissionService } from './permission.service'

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService, TypeOrmModule]
})
export class PermissionModule {}
