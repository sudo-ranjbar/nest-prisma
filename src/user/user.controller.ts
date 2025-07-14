import { Body, Controller, Get, Param, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { AccessTokenGaurd } from 'src/auth/gaurd/access-token.gaurd';
import { Roles } from './decorator/role.decorator';
import { RoleGaurd } from './gaurd/role.gaurd';

@Controller('user')
export class UserController {

  constructor(public userService: UserService) { }

  // GET ALL USERS
  @UseGuards(AccessTokenGaurd, RoleGaurd)
  @Roles('ADMIN')
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers({});
  }

  // CREATE USER
  @Post('/create')
  async createUser(@Body() createData: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(createData);
  }

  // GET PROFILE
  @UseGuards(AccessTokenGaurd)
  @Get('/profile')
  async getProfile(@Request() req: any) {
    return req.user;
  }

  // GET USER BY ID
  @Get('/:ID')
  async getUserById(@Param('ID') ID: string) {
    const user = await this.userService.getUser({ id: Number(ID) });
    return user;
  }


}
