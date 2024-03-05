import { IsString, IsNotEmpty } from 'class-validator'

/**
 * sign in
 */
export class SignInDto {
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string

  @IsString({ message: '密码必须是字符串格式' })
  @IsNotEmpty({ message: '密码必填' })
  readonly password: string
}
