import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {

  constructor(public userService: UserService) { }

  @Get('/:ID')
  // function
  async getUser(@Param('ID') ID: string) {
    const my_user = await this.userService.getUser({ id: Number(ID) })
    return my_user
  }

  @Post('/create')
  // function
  async createUser(@Body() createData: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(createData)
  }
}
