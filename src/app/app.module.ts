import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { logger } from 'src/middlewares/loggerFunctional.middleware';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({path: 'user/*', method: RequestMethod.GET})
    // consumer.apply(logger).forRoutes({path: '/user/*', method: RequestMethod.GET})
  }
}
