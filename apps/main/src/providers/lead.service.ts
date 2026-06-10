import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from 'src/databases/mongo/schemas/lead.schema';
import { User } from 'src/databases/postgres/entities/user/user.entity';
import { SrvError } from 'src/services/dto';
import { Repository } from 'typeorm';

@Injectable()
export class LeadService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepo: Repository<User>,
    @InjectModel(Lead.name) private readonly leadModel: Model<Lead>,
  ) {}

  async createLead({ query }) {
    const { data, id } = query;
    try {
      const result = await new this.leadModel({
        trackingCode: data.trackingCode,
        type: data.type,
        status: data.status,
        tag: data.tag,
        notes: data.notes,
        nextFollowUp: data.nextFollowUp,
        assignedUserID: id,
      });
      await result.save();
      return {
        message: 'Lead created',
        success: true,
        data: result,
      };
    } catch (error) {
      throw new SrvError(HttpStatus.CONFLICT, 'Tracking code already exists');
    }
  }

  async updateLead({ query }) {
    const { data, id, leadID } = query;
    let target = await this.leadModel.findOne({
      assignedUserID: id,
      _id: leadID,
    });
    if (!target)
      throw new SrvError(HttpStatus.NOT_FOUND, 'Lead does not exists');
    target = await this.leadModel.findByIdAndUpdate(leadID, data, {
      returnDocument: 'after',
    });
    return {
      message: 'Lead Updated',
      success: true,
      data: target,
    };
  }
}
