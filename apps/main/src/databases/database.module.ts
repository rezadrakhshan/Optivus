import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { PostgresProviders } from './postgres/postgres.service';
import { userProviders } from './postgres/providers/user.provider';
import { profileProviders } from './postgres/providers/profile.provider';

@Global()
@Module({
  providers: [
    ...PostgresProviders,
    ...userProviders,
    ...profileProviders,
    RedisService,
  ],
  exports: [
    ...PostgresProviders,
    ...userProviders,
    ...profileProviders,
    RedisService,
  ],
})
export class DatabaseModule {}
