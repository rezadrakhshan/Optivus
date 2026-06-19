import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/databases/mongo/schemas/category.schema';

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
    return category;
  }
}
