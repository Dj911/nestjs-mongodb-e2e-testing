import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserDocument } from './model/model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post()
  async addUser(
    @Body() data
  ): Promise<UserDocument> {
    return await this.usersService.createUser(data)
  }

  @Put(':id')
  async updateUser(
    @Body() data,
    @Param('id') id: string
  ): Promise<UserDocument> {
    return this.usersService.updateUser(id, data)
  }

  @Get()
  async getUser(): Promise<UserDocument[]> {
    return this.usersService.getUsers()
  }
}
