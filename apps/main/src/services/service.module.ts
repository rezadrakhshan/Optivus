import { Module } from '@nestjs/common';
import { SelfActionService } from './action.service';
import { UserService } from 'src/providers/user.service';
import { ServiceController } from './service.controller';
import { Generator } from 'src/utils/generator';

@Module({
  imports: [],
  providers: [SelfActionService, UserService, Generator],
  controllers: [ServiceController],
})
export class ServiceModule {}
