import { PartialType } from '@nestjs/mapped-types'
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'
import { Role } from '@/entities'

/**
 * 创建用户
 */
export class CreateUserDto {
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string

  @IsString({ message: '密码必须是字符串格式' })
  @IsNotEmpty({ message: '密码必填' })
  readonly password: string

  @IsEmail(undefined, { message: '邮箱格式有误' })
  @IsNotEmpty({ message: '邮箱必填' })
  readonly email: string

  @IsArray({ message: '角色格式有误' })
  @IsOptional()
  readonly roles?: Role['id'][]
}

/**
 * 更新用户
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
