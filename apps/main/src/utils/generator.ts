import { Global, HttpStatus, Injectable } from '@nestjs/common';
import { ActivityInputDto } from './dtos/activity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Activity } from 'src/databases/mongo/schemas/activity.schema';
import { Model, Types } from 'mongoose';
import { SrvError } from 'src/services/dto';

@Global()
@Injectable()
export class Generator {
  constructor(
    @InjectModel(Activity.name) private readonly activityModel: Model<Activity>,
  ) {}
  async generateOtp() {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const ttl = 2 * 60;
    return {
      otp,
      ttl,
    };
  }

  async activityGenerator(data: ActivityInputDto) {
    if (Types.ObjectId.isValid(data.leadID))
      throw new SrvError(HttpStatus.BAD_REQUEST, 'Invalid lead ID');

    await this.activityModel.create(data);
  }
}
