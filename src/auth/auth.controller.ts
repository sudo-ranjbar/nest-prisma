import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LocalAuthGaurd } from './local-auth.gaurd';
import { AccessTokenGaurd } from './access-token.gaurd';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  // REGISTER
  @Post('/register')
  async register(@Body() registerData: RegisterDTO): Promise<User> {
    return await this.authService.register(registerData)
  }

  // LOGIN
  @UseGuards(LocalAuthGaurd)
  @Post('/login')
  async login(@Body() loginData: LoginDTO, @Request() req: any): Promise<any> {
    return this.authService.login(req.user);
  }

  // LOGIN
  @UseGuards(AccessTokenGaurd)
  @Post('/logout')
  async logout(@Request() req: any): Promise<any> {
    await this.authService.removeToken(req.user.id)

    return {message: 'user logged out'};
  }

}
