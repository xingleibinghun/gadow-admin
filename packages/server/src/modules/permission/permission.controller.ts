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
import { PermissionService } from './permission.service'
import { CreateDto } from './permission.dto'
import { Permission } from '@/entities'

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async findAll(): Promise<Permission[]> {
    return await this.permissionService.findAll()
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: CreateDto) {
    await this.permissionService.create(dto)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id, @Body() dto: CreateDto) {
    await this.permissionService.update(id, dto)
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.permissionService.remove(id)
  }
}
