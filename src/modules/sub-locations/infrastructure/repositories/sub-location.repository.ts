import { ISubLocationDatabaseRepository } from '../../domain/repositories/sub-location.interface';
import { SubLocationEntity } from '../entities/sub-location.entity';
import { SubLocationModel } from '../../domain/models/sub-location.model';
import { ISubLocation } from '../../domain/interfaces/sub-location.interface';
import getTotalPages from 'src/lib/utils/calculate-total-pages';
import { InjectModel } from '@nestjs/sequelize';
import getSkip from '../../../../lib/utils/calculate-skip-pagination';
import isPaginate from '../../../../lib/utils/is-paginate';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGINATE,
  DEFAULT_PERPAGE,
} from 'config/constants';
import { SubLocationSearchCommand } from '../commands/search-sub-location.command';
import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/lib/interfaces/pagination.interface';

@Injectable()
export class DatabaseSubLocationRepository
  implements ISubLocationDatabaseRepository
{
  constructor(
    @InjectModel(SubLocationEntity)
    private readonly subLocationEntityRepository: typeof SubLocationEntity,
  ) {}

  async findAll(
    query: SubLocationSearchCommand,
  ): Promise<ISubLocation[] | IPagination<ISubLocation>> {
    const {
      page = DEFAULT_PAGE,
      perPage = DEFAULT_PERPAGE,
      paginate = DEFAULT_PAGINATE,
    } = query;

    if (!isPaginate(paginate)) {
      const list = await this.subLocationEntityRepository.findAll();

      return list.map((data) => data as ISubLocation);
    }

    const { rows, count } =
      await this.subLocationEntityRepository.findAndCountAll({
        limit: perPage,
        offset: getSkip(page, perPage),
      });

    return {
      items: rows.map((data) => data as ISubLocation),
      meta: {
        totalItems: count,
        itemsPerPage: perPage,
        totalPages: getTotalPages(count, perPage),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<ISubLocation> {
    return (await this.subLocationEntityRepository.findOne({
      where: { id },
    })) as ISubLocation;
  }

  async create(data: SubLocationModel): Promise<ISubLocation> {
    return (await this.subLocationEntityRepository.create(
      data,
    )) as ISubLocation;
  }

  async update(id: number, data: SubLocationModel): Promise<ISubLocation> {
    data.setUpdatedAt();
    await this.subLocationEntityRepository.update(data, { where: { id } });
    return data as ISubLocation;
  }

  async delete(id: number): Promise<void> {
    await this.subLocationEntityRepository.destroy({ where: { id } });
  }
}
