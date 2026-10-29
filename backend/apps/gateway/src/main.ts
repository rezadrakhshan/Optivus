import * as express from 'express';
import * as config from 'config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { swaggerOptions } from './config/swagger.config';

const cfg: any = config.get('info');

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await swaggerOptions(app, cfg);
  await app.listen(cfg.port ?? 3000);
}
bootstrap();
