import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { logger } from 'src/middleware/loggerFunctional.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, AuthModule],
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({path: 'user/*path', method: RequestMethod.GET})
    // consumer.apply(logger).forRoutes({path: '/user/*', method: RequestMethod.GET})
  }
}
