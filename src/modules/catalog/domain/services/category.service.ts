import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryDatabaseRepository } from '../repositories/category.interface';
import { CategoryModel } from '../models/category.model';
import { ICategory } from '../interfaces/category.interface';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { CategorySearchCommand } from '../../infrastructure/commands/search-category.command';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(ICategoryDatabaseRepository)
    private readonly categoryDatabaseRepository: ICategoryDatabaseRepository,
  ) {}

  async create(data: Partial<ICategory>, userId: number): Promise<ICategory> {
    const categoryM = new CategoryModel(data.name, data.description, userId);
    return await this.categoryDatabaseRepository.create(categoryM);
  }

  async findAll(
    query: CategorySearchCommand,
  ): Promise<ICategory[] | IPagination<ICategory>> {
    return await this.categoryDatabaseRepository.findAll(query);
  }

  async findOne(id: number): Promise<ICategory> {
    const data = await this.categoryDatabaseRepository.findOne(id);

    if (!data) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return data;
  }

  async update(
    id: number,
    data: Partial<ICategory>,
    userId: number,
  ): Promise<ICategory> {
    const category = await this.findOne(id);
    const categoryM = this.parseEntityToModel(category);
    categoryM.update(data);
    categoryM.updatedBy = userId;
    return await this.categoryDatabaseRepository.update(id, categoryM);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.categoryDatabaseRepository.delete(id);
  }

  // TODO: crear parseEntityToModel como en el Todos service
  private parseEntityToModel(data: ICategory): CategoryModel {
    return new CategoryModel(
      data.name,
      data.description,
      data.createdBy,
      data.updatedBy,
      data.createdAt,
      data.updatedAt,
    );
  }
}
