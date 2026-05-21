import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';

const cfg: any = config.get('jwt');
@Module({
  imports: [
    JwtModule.register({
      secret: cfg.secret,
    }),
  ],
  controllers: [AuthController, ProfileController],
  providers: [
    AuthService,
    ProfileService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UserModule {}
