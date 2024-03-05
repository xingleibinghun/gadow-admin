import { IsNotEmpty, IsString } from 'class-validator'

/**
 * 创建
 */
export class CreateDto {
  @IsNotEmpty({ message: '权限名必填' })
  @IsString()
  name: string

  @IsNotEmpty({ message: '描述必填' })
  @IsString()
  desc: string
}
