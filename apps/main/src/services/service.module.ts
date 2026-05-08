import { Module } from '@nestjs/common';
import { SelfActionService } from './action.service';
import { UserService } from 'src/providers/user.service';
import { ServiceController } from './service.controller';

@Module({
  imports: [],
  providers: [SelfActionService, UserService],
  controllers: [ServiceController],
})
export class ServiceModule {}
