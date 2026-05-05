import { Module } from '@nestjs/common';
import { ServiceModule } from './services/service.module';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [ServiceModule, RestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
