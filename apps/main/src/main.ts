import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as config from 'config';

const cfg: any = config.get('info');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: cfg.host,
        port: cfg.port,
      },
    }, 
  );
  await app.listen();
}
bootstrap();
