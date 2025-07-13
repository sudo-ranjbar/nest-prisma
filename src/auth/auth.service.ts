import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDTO } from './dto/register.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  // REGISTER METHOD
  async register(registerData: RegisterDTO): Promise<User | any> {
    const saltOrRounds = 10;
    const password = registerData.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.prisma.user.create({
      data: {
        name: registerData.name,
        email: registerData.email,
        password: hash
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });
  }

  // LOGIN METHOD
  async login(user: User){
    
    // database approach used for logout operation in server
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email
    });

    await this.updateToken(user.id, token);

    return {token}

    // const payload = { id: user.id, email: user.email };

    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }

  // VALIDATE USER
  async validateUser(email: string, password: string){
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if(!user) throw new UnauthorizedException('user not found!');

    if(!await bcrypt.compare(password, user.password)) throw new UnauthorizedException('wrong password!')
      
    return user;

  }

  // UPDATE TOKEN
  async updateToken(id: number, token: string){
    await this.prisma.user.update({

      where: {id},
      data: {token}
    });

  }

  // REMOVE TOKEN
  async removeToken(id: number){
    await this.prisma.user.update({

      where: { id },
      data: { token: null }
    });

  }

  // CHECK FOR LOGIN
  async checkLoggedIn(id: number){
    const user = await this.prisma.user.findUnique({
      where: {id}
    });

    if (user?.token === null) return false;

    return true;
  }
}
