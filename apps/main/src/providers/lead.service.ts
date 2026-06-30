import { HttpCode, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { threadCpuUsage } from 'process';
import { Category } from 'src/databases/mongo/schemas/category.schema';
import { Lead } from 'src/databases/mongo/schemas/lead.schema';
import { User } from 'src/databases/postgres/entities/user/user.entity';
import { ServiceResponseData, SrvError } from 'src/services/dto';
import { Repository } from 'typeorm';

@Injectable()
export class LeadService {
  constructor(
    @InjectModel(Lead.name) private readonly leadModel: Model<Lead>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async createLead({ query }): Promise<ServiceResponseData> {
    const { data, id } = query;
    const category = await this.categoryModel.findById(data.category);
    if (!category || !Types.ObjectId.isValid(data.category))
      throw new SrvError(HttpStatus.NOT_FOUND, 'Invalid category');
    try {
      const result = new this.leadModel({
        trackingCode: data.trackingCode,
        type: data.type,
        status: data.status,
        tag: data.tag,
        notes: data.notes,
        category: category,
        nextFollowUp: data.nextFollowUp,
        assignedUserID: id,
      });
      await result.save();
      return {
        message: 'Lead created',
        data: {
          success: true,
          result,
        },
      };
    } catch (error) {
      throw new SrvError(HttpStatus.CONFLICT, 'Tracking code already exists');
    }
  }

  async updateLead({ query }): Promise<ServiceResponseData> {
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
      data: {
        success: true,
        target,
      },
    };
  }
  async getAllLeads({ query }): Promise<ServiceResponseData> {
    const result = await this.leadModel.find({ assignedUserID: query });
    return {
      message: 'List of leads is here!',
      data: {
        success: true,
        result,
      },
    };
  }

  async getLeadDetail({ query }): Promise<ServiceResponseData> {
    const { id, userID } = query;
    const target = await this.leadModel.findOne({
      _id: id,
      assignedUserID: userID,
    });
    if (!target)
      throw new SrvError(HttpStatus.NOT_FOUND, 'Lead does not exist');
    return {
      message: 'Lead detail is here!',
      data: {
        success: true,
        target,
      },
    };
  }

  async removeLead({ query }): Promise<ServiceResponseData> {
    const { id, userID } = query;
    const result = await this.leadModel.findOneAndDelete({
      _id: id,
      assignedUserID: userID,
    });
    if (!result)
      throw new SrvError(HttpStatus.NOT_FOUND, 'Lead does not exist');
    return {
      message: 'Lead removed',
      data: {
        success: true,
        result,
      },
    };
  }
}
