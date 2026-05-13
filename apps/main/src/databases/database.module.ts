import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { PostgresProviders } from './postgres/postgres.service';
import { userProviders } from './postgres/providers/user.provider';

@Global()
@Module({
  providers: [...PostgresProviders, ...userProviders, RedisService],
  exports: [...PostgresProviders, ...userProviders, RedisService],
})
export class DatabaseModule {}
