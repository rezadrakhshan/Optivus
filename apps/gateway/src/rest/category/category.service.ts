import { Injectable } from '@nestjs/common';
import { MainServiceClient } from 'src/services/main.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { HandlerSrcCliResponse } from 'src/response/http_exception.filter';

@Injectable()
export class CategoryService {
  constructor(private readonly mainSrcCli: MainServiceClient) {}

  async createCategory(data: CreateCategoryDto, req) {
    const dto = { data, user: req.user.id };

    const result = await this.mainSrcCli.callAction({
      provider: 'CATEGORY',
      action: 'createCategory',
      query: dto,
    });

    return HandlerSrcCliResponse(result);
  }

  async updateCategory(id: string, req, data: UpdateCategoryDto) {
    const dto = { id, createdBy: req.user.id, data };
    const result = await this.mainSrcCli.callAction({
      provider: 'CATEGORY',
      action: 'updateCategory',
      query: dto,
    });
    return HandlerSrcCliResponse(result);
  }

  async getAllCategories(req) {
    const result = await this.mainSrcCli.callAction({
      provider: 'CATEGORY',
      action: 'getAllCategories',
      query: req.user.id,
    });

    return HandlerSrcCliResponse(result);
  }

  async removeCategory(id: string, req) {
    const dto = { id, createdBy: req.user.id };
    const result = await this.mainSrcCli.callAction({
      provider: 'CATEGORY',
      action: 'removeCategory',
      query: dto,
    });
    return HandlerSrcCliResponse(result);
  }
}
