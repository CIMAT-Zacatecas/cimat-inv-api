import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryDatabaseRepository } from '../repositories/category.interface';
import { CategoryModel } from '../models/category.model';
import { ICategory } from '../interfaces/category.interface';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { TodoSearchCommand } from 'src/modules/todos/infrastructure/commands/todo-search.command';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(ICategoryDatabaseRepository)
    private readonly categoryDatabaseRepository: ICategoryDatabaseRepository,
  ) {}

  async create(data: Partial<ICategory>, userId: number): Promise<ICategory> {
    const categoryModel = new CategoryModel(
      data.name,
      data.description,
      userId,
    );
    return await this.categoryDatabaseRepository.create(categoryModel);
  }

  async findAll(
    query: TodoSearchCommand,
  ): Promise<ICategory[] | IPagination<ICategory>> {
    return await this.categoryDatabaseRepository.findAll(query);
  }

  async findOne(id: number): Promise<ICategory> {
    const category = await this.categoryDatabaseRepository.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(
    id: number,
    data: Partial<ICategory>,
    userId: number,
  ): Promise<ICategory> {
    const category = await this.findOne(id);
    // find the user in the database
    const categoryM = this.parseEntityToModel(category);
    categoryM.updatedBy = userId;
    categoryM.update(data);
    return await this.categoryDatabaseRepository.update(id, categoryM);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.categoryDatabaseRepository.delete(id);
  }

  // TODO: crear parseEntityToModel como en el Todos service
  private parseEntityToModel(data: ICategory): CategoryModel {
    return new CategoryModel(data.name, data.description, data.updatedBy);
  }
}
