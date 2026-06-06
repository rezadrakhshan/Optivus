import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from 'src/databases/mongo/schemas/lead.schema';
import { User } from 'src/databases/postgres/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeadService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepo: Repository<User>,
    @InjectModel(Lead.name) private readonly leadModel: Model<Lead>,
  ) {}
}
