import { Body, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) { }

  async register(registerData: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(registerData)
  }
}
