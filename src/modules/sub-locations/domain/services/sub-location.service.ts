import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISubLocationDatabaseRepository } from '../repositories/sub-location.interface';
import { SubLocationModel } from '../models/sub-location.model';
import { ISubLocation } from '../interfaces/sub-location.interface';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { SubLocationSearchCommand } from '../../infrastructure/commands/search-sub-location.command';

@Injectable()
export class SubLocationService {
  constructor(
    @Inject(ISubLocationDatabaseRepository)
    private readonly subLocationDatabaseRepository: ISubLocationDatabaseRepository,
  ) {}

  async create(
    data: Partial<ISubLocation>,
    userId: number,
  ): Promise<ISubLocation> {
    const subLocationM = new SubLocationModel(
      data.code,
      data.name,
      data.locationId,
      data.description,
      userId,
    );
    return await this.subLocationDatabaseRepository.create(subLocationM);
  }

  async findAll(
    query: SubLocationSearchCommand,
  ): Promise<ISubLocation[] | IPagination<ISubLocation>> {
    return await this.subLocationDatabaseRepository.findAll(query);
  }

  async findOne(id: number): Promise<ISubLocation> {
    const data = await this.subLocationDatabaseRepository.findOne(id);

    if (!data) {
      throw new NotFoundException(`SubLocation with id ${id} not found`);
    }
    return data;
  }

  async update(
    id: number,
    data: Partial<ISubLocation>,
    userId: number,
  ): Promise<ISubLocation> {
    const subLocation = await this.findOne(id);
    const subLocationM = this.parseEntityToModel(subLocation);
    subLocationM.update(data);
    subLocationM.updatedBy = userId;
    return await this.subLocationDatabaseRepository.update(id, subLocationM);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.subLocationDatabaseRepository.delete(id);
  }

  private parseEntityToModel(data: ISubLocation): SubLocationModel {
    return new SubLocationModel(
      data.code,
      data.name,
      data.locationId,
      data.description,
      data.createdBy,
      data.updatedBy,
      data.createdAt,
      data.updatedAt,
    );
  }
}
