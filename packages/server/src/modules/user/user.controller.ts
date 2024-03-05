import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  UseInterceptors,
  ValidationPipe,
  ClassSerializerInterceptor,
  SerializeOptions,
  Request,
  Put,
  Delete,
  ParseIntPipe
} from '@nestjs/common'
import { Roles } from '@/decorators/roles.decorator'
import { RequirePermission } from '@/decorators/require-permission.decorator'
import { User } from '@/entities'
import { Role } from '@/types/enums'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { UpdateUserFields } from './types'
import { PERMISSIONS } from '@/common'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取所有用户
   */
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.ADMIN)
  @SerializeOptions({
    excludePrefixes: ['_']
  })
  @RequirePermission(PERMISSIONS['USER.FETCH'])
  async findAll() {
    return this.userService.findAll({
      relations: ['roles']
    })
  }

  /**
   * 获取当前用户
   */
  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['_']
  })
  async getProfile(@Request() req): Promise<User> {
    return this.userService.findOne(
      { userId: req.user.userId },
      { relations: ['roles'] }
    )
  }

  /**
   * 获取某个用户(排除一些敏感字段)
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['_']
  })
  @Get(':id')
  @RequirePermission(PERMISSIONS['USER.FETCH'])
  async getOneUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne({ userId: id }, { relations: ['roles'] })
  }

  /**
   * 创建用户
   */
  @Post('create')
  @RequirePermission(PERMISSIONS['USER.CREATE'])
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: CreateUserDto) {
    await this.userService.create(dto)
  }

  /**
   * 更新用户
   */
  @Put(':id')
  @RequirePermission(PERMISSIONS['USER.EDIT'])
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', new ParseIntPipe()) id,
    @Body() dto: UpdateUserDto
  ) {
    const updateFields: UpdateUserFields[] = [
      'username',
      'email',
      'sex',
      'avatar',
      'roles'
    ]
    await this.userService.update(id, dto, updateFields)
  }

  /**
   * 删除用户
   */
  @Delete(':id')
  @RequirePermission(PERMISSIONS['USER.DELETE'])
  async deleteUser(@Param('id') id) {
    await this.userService.remove(id)
  }
}
