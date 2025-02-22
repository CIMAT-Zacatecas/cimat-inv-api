import { ICategoryDatabaseRepository } from '../../domain/repositories/category.interface';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryModel } from '../../domain/models/category.model';
import { ICategory } from '../../domain/interfaces/category.interface';
import getTotalPages from 'src/lib/utils/calculate-total-pages';
import { InjectModel } from '@nestjs/sequelize';
import getSkip from '../../../../lib/utils/calculate-skip-pagination';
import isPaginate from '../../../../lib/utils/is-paginate';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGINATE,
  DEFAULT_PERPAGE,
} from 'config/constants';
import { CategorySearchCommand } from '../commands/search-category.command';
import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/lib/interfaces/pagination.interface';

@Injectable()
export class DatabaseCategoryRepository implements ICategoryDatabaseRepository {
  constructor(
    @InjectModel(CategoryEntity)
    private readonly categoryEntityRepository: typeof CategoryEntity,
  ) {}

  async findAll(
    query: CategorySearchCommand,
  ): Promise<ICategory[] | IPagination<ICategory>> {
    const {
      page = DEFAULT_PAGE,
      perPage = DEFAULT_PERPAGE,
      paginate = DEFAULT_PAGINATE,
    } = query;

    if (!isPaginate(paginate)) {
      const list = await this.categoryEntityRepository.findAll();

      return list.map((data) => data as ICategory);
    }

    const { rows, count } = await this.categoryEntityRepository.findAndCountAll(
      {
        limit: perPage,
        offset: getSkip(page, perPage),
      },
    );

    return {
      items: rows.map((data) => data as ICategory),
      meta: {
        totalItems: count,
        itemsPerPage: perPage,
        totalPages: getTotalPages(count, perPage),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<ICategory> {
    return (await this.categoryEntityRepository.findOne({
      where: { id },
    })) as ICategory;
  }

  async create(data: CategoryModel): Promise<ICategory> {
    return (await this.categoryEntityRepository.create(data)) as ICategory;
  }

  async update(id: number, data: CategoryModel): Promise<ICategory> {
    data.setUpdatedAt();
    await this.categoryEntityRepository.update(data, { where: { id } });
    return data as ICategory;
  }

  async delete(id: number): Promise<void> {
    await this.categoryEntityRepository.destroy({ where: { id } });
  }
}
