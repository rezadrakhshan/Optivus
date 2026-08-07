import { Module } from '@nestjs/common';
import { SelfActionService } from './action.service';
import { UserService } from 'src/providers/user.service';
import { ServiceController } from './service.controller';
import { Generator } from 'src/utils/generator';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { ProfileService } from 'src/providers/profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lead, LeadSchema } from 'src/databases/mongo/schemas/lead.schema';
import { LeadService } from 'src/providers/lead.service';
import {
  Category,
  CategorySchema,
} from 'src/databases/mongo/schemas/category.schema';
import { CategoryService } from 'src/providers/category.service';
import {
  Activity,
  ActivitySchema,
} from 'src/databases/mongo/schemas/activity.schema';
import { MessageSender } from 'src/utils/message-sender';

const cfg: any = config.get('jwt');

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: cfg.secret,
    }),
    MongooseModule.forFeature([
      { name: Lead.name, schema: LeadSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  providers: [
    SelfActionService,
    UserService,
    ProfileService,
    LeadService,
    CategoryService,
    Generator,
    MessageSender,
  ],
  controllers: [ServiceController],
})
export class ServiceModule {}
