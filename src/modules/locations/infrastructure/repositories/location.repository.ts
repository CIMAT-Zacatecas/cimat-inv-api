import { ILocationDatabaseRepository } from '../../domain/repositories/location.interface';
import { LocationEntity } from '../entities/location.entity';
import { LocationModel } from '../../domain/models/location.model';
import { ILocation } from '../../domain/interfaces/location.interface';
import getTotalPages from 'src/lib/utils/calculate-total-pages';
import { InjectModel } from '@nestjs/sequelize';
import getSkip from '../../../../lib/utils/calculate-skip-pagination';
import isPaginate from '../../../../lib/utils/is-paginate';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGINATE,
  DEFAULT_PERPAGE,
} from 'config/constants';
import { LocationSearchCommand } from '../commands/search-location.command';
import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/lib/interfaces/pagination.interface';

@Injectable()
export class DatabaseLocationRepository implements ILocationDatabaseRepository {
  constructor(
    @InjectModel(LocationEntity)
    private readonly locationEntityRepository: typeof LocationEntity,
  ) {}

  async findAll(
    query: LocationSearchCommand,
  ): Promise<ILocation[] | IPagination<ILocation>> {
    const {
      page = DEFAULT_PAGE,
      perPage = DEFAULT_PERPAGE,
      paginate = DEFAULT_PAGINATE,
    } = query;

    if (!isPaginate(paginate)) {
      const list = await this.locationEntityRepository.findAll();

      return list.map((data) => data as ILocation);
    }

    const { rows, count } = await this.locationEntityRepository.findAndCountAll(
      {
        limit: perPage,
        offset: getSkip(page, perPage),
      },
    );

    return {
      items: rows.map((data) => data as ILocation),
      meta: {
        totalItems: count,
        itemsPerPage: perPage,
        totalPages: getTotalPages(count, perPage),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<ILocation> {
    return (await this.locationEntityRepository.findOne({
      where: { id },
    })) as ILocation;
  }

  async create(data: LocationModel): Promise<ILocation> {
    return (await this.locationEntityRepository.create(data)) as ILocation;
  }

  async update(id: number, data: LocationModel): Promise<ILocation> {
    data.setUpdatedAt();
    await this.locationEntityRepository.update(data, { where: { id } });
    return data as ILocation;
  }

  async delete(id: number): Promise<void> {
    await this.locationEntityRepository.destroy({ where: { id } });
  }
}
