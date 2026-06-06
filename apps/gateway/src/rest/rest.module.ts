import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { LeadModule } from './lead/lead.module';

@Module({
  imports: [
    UserModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'lead',
        module: LeadModule,
      },
    ]),
  ],
})
export class RestModule {}
