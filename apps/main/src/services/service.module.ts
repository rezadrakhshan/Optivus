import { Module } from '@nestjs/common';
import { SelfActionService } from './action.service';
import { UserService } from 'src/providers/user.service';
import { ServiceController } from './service.controller';
import { Generator } from 'src/utils/generator';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';

const cfg: any = config.get('jwt');

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: cfg.secret,
    }),
  ],
  providers: [SelfActionService, UserService, Generator],
  controllers: [ServiceController],
})
export class ServiceModule {}
