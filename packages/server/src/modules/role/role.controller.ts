import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  Delete
} from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateDto } from './role.dto'
import { Role } from '@/entities'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<Role[]> {
    return await this.roleService.findAll()
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: CreateDto) {
    await this.roleService.create(dto)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id, @Body() dto: CreateDto) {
    await this.roleService.update(id, dto)
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.roleService.remove(id)
  }
}
