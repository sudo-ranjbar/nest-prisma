import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@prisma/client';

@Controller('user')
export class UserController {

  constructor(public user: UserService) { }

  @Get('/:ID')
  // function
  async getUser(@Param('ID') ID: string) {
    const my_user = await this.user.getUser({ id: Number(ID) })
    return my_user
  }

  @Post('/create')
  // function
  async createUser(@Body() createData: Prisma.UserCreateInput): Promise<User> {
    return await this.user.createUser(createData)
  }
}
