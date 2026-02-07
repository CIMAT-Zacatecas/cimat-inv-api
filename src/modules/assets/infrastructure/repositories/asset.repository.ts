import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AssetEntity } from '../entities/asset.entity';
import { AssetModel } from '../../domain/models/asset.model';
import { IAsset } from '../../domain/interfaces/asset.interface';
import getTotalPages from 'src/lib/utils/calculate-total-pages';
import getSkip from '../../../../lib/utils/calculate-skip-pagination';
import isPaginate from '../../../../lib/utils/is-paginate';
import { AssetSearchCommand } from '../commands/search-asset.command';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGINATE,
  DEFAULT_PERPAGE,
} from 'config/constants';
import { IAssetDatabaseRepository } from '../../domain/repositories/asset.interface';

@Injectable()
export class DatabaseAssetRepository implements IAssetDatabaseRepository {
  constructor(
    @InjectModel(AssetEntity)
    private readonly assetEntityRepository: typeof AssetEntity,
  ) {}

  async findAll(
    query: AssetSearchCommand,
  ): Promise<IAsset[] | IPagination<IAsset>> {
    const {
      page = DEFAULT_PAGE,
      perPage = DEFAULT_PERPAGE,
      paginate = DEFAULT_PAGINATE,
    } = query;

    if (!isPaginate(paginate)) {
      const list = await this.assetEntityRepository.findAll();

      return list.map((data) => data as IAsset);
    }

    const { rows, count } = await this.assetEntityRepository.findAndCountAll({
      limit: perPage,
      offset: getSkip(page, perPage),
    });

    return {
      items: rows.map((data) => data as IAsset),
      meta: {
        totalItems: count,
        itemsPerPage: perPage,
        totalPages: getTotalPages(count, perPage),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<IAsset> {
    return (await this.assetEntityRepository.findOne({
      where: { id },
    })) as IAsset;
  }

  async create(data: AssetModel): Promise<IAsset> {
    const createdAsset = await this.assetEntityRepository.create(data);
    return createdAsset as IAsset;
  }

  async update(id: number, data: AssetModel): Promise<IAsset> {
    data.setUpdatedAt();
    await this.assetEntityRepository.update(data, { where: { primaryId: id } });
    return data as IAsset;
  }

  async delete(id: number): Promise<void> {
    await this.assetEntityRepository.destroy({ where: { primaryId: id } });
  }
}
