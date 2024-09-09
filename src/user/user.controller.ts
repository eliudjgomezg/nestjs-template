import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common'
import { IResponse } from 'src/common/interfaces/IResponse'
import { User } from './types/user.model'
import { UserService } from './user.service'
import { ApiVersion } from 'src/common/Enums'

@Controller(`${ApiVersion.V1}/users`)
export class UserController {
  constructor(private readonly user: UserService) { }

  @Get()
  findAll(@Query() query): Promise<IResponse<User[]>> {
    return this.user.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IResponse<User>> {
    return this.user.findOne(id)
  }

  @Post()
  create(@Body() body: User): Promise<IResponse<User>> {
    return this.user.create(body)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: User): Promise<IResponse<User>> {
    return this.user.update(id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IResponse<User>> {
    return this.user.remove(id)
  }
}
