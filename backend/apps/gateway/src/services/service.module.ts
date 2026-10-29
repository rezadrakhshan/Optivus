import { Global, Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import * as config from 'config';
import { MainServiceClient } from './main.service';

const cfg: any = config.get('service');

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Main',
        transport: Transport.TCP,
        options: { host: `${cfg.host}`, port: cfg.port },
      },
    ]),
  ],
  providers: [MainServiceClient],
  exports: [MainServiceClient],
})
export class ServiceModule {}
