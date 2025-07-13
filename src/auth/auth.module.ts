import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessStrategy } from './access.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AccessStrategy], //dependencies
  imports: [
    UserModule,
    PrismaModule, 
    PassportModule, 
    JwtModule.register({
      secret: '$$SECRETKEY$$',
      signOptions: {expiresIn: '1d'}
    })
  ]
})
export class AuthModule {}
