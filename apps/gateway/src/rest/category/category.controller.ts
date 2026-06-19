import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Request } from 'express';
import { CreateCategoryDto } from './dtos';

@ApiBearerAuth()
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'create category endpoint' })
  async createCategory(@Body() data: CreateCategoryDto, @Req() req: Request) {
    return this.categoryService.createCategory(data, req);
  }
}
