import { IAssetStatusDatabaseRepository } from '../../domain/repositories/asset-status.interface';
import { AssetStatusEntity } from '../entities/asset-status.entity';
import { AssetStatusModel } from '../../domain/models/asset-status.model';
import { IAssetStatus } from '../../domain/interfaces/asset-status.interface';
import getTotalPages from 'src/lib/utils/calculate-total-pages';
import { InjectModel } from '@nestjs/sequelize';
import getSkip from '../../../../lib/utils/calculate-skip-pagination';
import isPaginate from '../../../../lib/utils/is-paginate';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGINATE,
  DEFAULT_PERPAGE,
} from 'config/constants';
import { AssetStatusSearchCommand } from '../commands/search-asset-status.command';
import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/lib/interfaces/pagination.interface';

@Injectable()
export class DatabaseAssetStatusRepository
  implements IAssetStatusDatabaseRepository
{
  constructor(
    @InjectModel(AssetStatusEntity)
    private readonly AssetStatusEntityRepository: typeof AssetStatusEntity,
  ) {}

  async findAll(
    query: AssetStatusSearchCommand,
  ): Promise<IAssetStatus[] | IPagination<IAssetStatus>> {
    const {
      page = DEFAULT_PAGE,
      perPage = DEFAULT_PERPAGE,
      paginate = DEFAULT_PAGINATE,
    } = query;

    if (!isPaginate(paginate)) {
      const list = await this.AssetStatusEntityRepository.findAll();

      return list.map((data) => data as IAssetStatus);
    }

    const { rows, count } =
      await this.AssetStatusEntityRepository.findAndCountAll({
        limit: perPage,
        offset: getSkip(page, perPage),
      });

    return {
      items: rows.map((data) => data as IAssetStatus),
      meta: {
        totalItems: count,
        itemsPerPage: perPage,
        totalPages: getTotalPages(count, perPage),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<IAssetStatus> {
    return (await this.AssetStatusEntityRepository.findOne({
      where: { id },
    })) as IAssetStatus;
  }

  async create(data: AssetStatusModel): Promise<IAssetStatus> {
    return (await this.AssetStatusEntityRepository.create(
      data,
    )) as IAssetStatus;
  }

  async update(id: number, data: AssetStatusModel): Promise<IAssetStatus> {
    data.setUpdatedAt();
    await this.AssetStatusEntityRepository.update(data, { where: { id } });
    return data as IAssetStatus;
  }

  async delete(id: number): Promise<void> {
    await this.AssetStatusEntityRepository.destroy({ where: { id } });
  }
}
