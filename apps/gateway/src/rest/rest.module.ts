import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { LeadModule } from './lead/lead.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UserModule,
    LeadModule,
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'lead',
        module: LeadModule,
      },
      {
        path: 'category',
        module: CategoryModule,
      },
    ]),
  ],
})
export class RestModule {}
