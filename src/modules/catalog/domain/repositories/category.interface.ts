import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { ICategory } from '../interfaces/category.interface';
import { CategoryModel } from '../models/category.model';
import { CategorySearchCommand } from '../../infrastructure/commands/search-category.command';

export interface ICategoryDatabaseRepository {
  findAll(
    query: CategorySearchCommand,
  ): Promise<ICategory[] | IPagination<ICategory>>;
  findOne(id: number): Promise<ICategory>;
  create(data: CategoryModel): Promise<ICategory>;
  update(id: number, data: CategoryModel): Promise<ICategory>;
  delete(id: number): Promise<void>;
}

export const ICategoryDatabaseRepository = Symbol(
  'ICategoryDatabaseRepository',
);
