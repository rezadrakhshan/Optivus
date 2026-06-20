import {
  Body,
  Controller,
  Post,
  Req,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Request } from 'express';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

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

  @Put(':id')
  @ApiOperation({ summary: 'update category endpoint' })
  async updateCategory(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, req, data);
  }

  @Get()
  @ApiOperation({ summary: 'endpoint for get all categories' })
  async getAllCategories(@Req() req: Request) {
    return this.categoryService.getAllCategories(req);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'endpoint for remove single category' })
  async removeCategory(@Param('id') id: string, @Req() req: Request) {
    return this.categoryService.removeCategory(id, req);
  }
}
