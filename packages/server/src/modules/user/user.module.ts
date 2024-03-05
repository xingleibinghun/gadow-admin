import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@/entities'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { RoleModule } from '@/modules/role/role.module'
import { RoleService } from '@/modules/role/role.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule],
  controllers: [UserController],
  providers: [UserService, RoleService],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
