import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { PostgresProviders } from './postgres/postgres.service';
import { userProviders } from './postgres/providers/user.provider';
import { profileProviders } from './postgres/providers/profile.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongo/mongoose.service';

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
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
})
export class DatabaseModule {}
