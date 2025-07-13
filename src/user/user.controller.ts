import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { AccessTokenGaurd } from 'src/auth/access-token.gaurd';

@Controller('user')
export class UserController {

  constructor(public userService: UserService) { }

  // CREATE USER
  @Post('/create')
  async createUser(@Body() createData: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(createData)
  }

  // GET PROFILE
  @UseGuards(AccessTokenGaurd)
  @Get('/profile')
  async getProfile(@Request() req: any) {
    return req.user;
  }

  // GET USER
  @Get('/:ID')
  async getUser(@Param('ID') ID: string) {
    const user = await this.userService.getUser({ id: Number(ID) })
    return user
  }


}
