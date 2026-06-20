import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from 'src/databases/mongo/schemas/category.schema';
import { SrvError } from 'src/services/dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory({ query }) {
    const { data, user } = query;
    const category = await this.categoryModel.create({
      name: data.name,
      slug: data.slug,
      createdBy: user,
    });
    return {
      message: 'Category created',
      success: true,
      data: category,
    };
  }

  async updateCategory({ query }) {
    const { data, createdBy, id } = query;
    if (!Types.ObjectId.isValid(id))
      throw new SrvError(HttpStatus.BAD_REQUEST, 'invalid id');
    const target = await this.categoryModel.findOneAndUpdate(
      { _id: id, createdBy: createdBy },
      data,
      { new: true },
    );

    if (!target)
      throw new SrvError(HttpStatus.NOT_FOUND, 'category does not exists');
    return {
      message: 'Category updated',
      success: true,
      data: target,
    };
  }
}
