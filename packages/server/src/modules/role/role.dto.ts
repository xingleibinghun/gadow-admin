import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import { Permission } from '@/entities'

/**
 * 创建
 */
export class CreateDto {
  @IsNotEmpty({ message: '角色名必填' })
  @IsString()
  name: string

  @IsNotEmpty({ message: '权限必填' })
  @IsArray()
  permissions: Permission[]
}
