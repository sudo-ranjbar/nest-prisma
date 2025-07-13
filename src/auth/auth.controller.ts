import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('/register')
  // function
  async register(@Body() registerData: CreateUserDTO): Promise<User> {
    return await this.authService.register(registerData)
  }
}
