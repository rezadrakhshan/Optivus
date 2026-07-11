import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from 'src/databases/mongo/schemas/category.schema';
import { Lead } from 'src/databases/mongo/schemas/lead.schema';
import { ServiceResponseData, SrvError } from 'src/services/dto';
import { Generator } from 'src/utils/generator';
import { ActivityType } from 'src/databases/mongo/enums/activity-type.enum';

@Injectable()
export class LeadService {
  constructor(
    @InjectModel(Lead.name) private readonly leadModel: Model<Lead>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    private readonly generator: Generator,
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
      await this.generator.activityGenerator({
        leadID: result._id,
        description: 'Created a new lead.',
        createdBy: id,
        type: ActivityType.LEAD_CREATED,
        metadata: result.toObject(),
      });
      return {
        message: 'Lead created',
        data: {
          success: true,
          result,
        },
      };
    } catch (error) {
      throw new SrvError(HttpStatus.CONFLICT, error);
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
    await this.generator.activityGenerator({
      leadID: leadID,
      description: 'Updated lead information.',
      createdBy: id,
      type: ActivityType.LEAD_UPDATED,
      metadata: { target },
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

    await this.generator.activityGenerator({
      leadID: id,
      description: 'Deleted a lead.',
      createdBy: userID,
      type: ActivityType.LEAD_DELETED,
      metadata: result.toObject(),
    });
    return {
      message: 'Lead removed',
      data: {
        success: true,
        result,
      },
    };
  }
}
