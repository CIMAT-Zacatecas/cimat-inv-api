import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ILocationDatabaseRepository } from '../repositories/location.interface';
import { LocationModel } from '../models/location.model';
import { ILocation } from '../interfaces/location.interface';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { LocationSearchCommand } from '../../infrastructure/commands/search-location.command';

@Injectable()
export class LocationService {
  constructor(
    @Inject(ILocationDatabaseRepository)
    private readonly locationDatabaseRepository: ILocationDatabaseRepository,
  ) {}

  async create(data: Partial<ILocation>, userId: number): Promise<ILocation> {
    const locationM = new LocationModel(
      data.name,
      data.description,
      data.code,
      userId,
    );
    return await this.locationDatabaseRepository.create(locationM);
  }

  async findAll(
    query: LocationSearchCommand,
  ): Promise<ILocation[] | IPagination<ILocation>> {
    return await this.locationDatabaseRepository.findAll(query);
  }

  async findOne(id: number): Promise<ILocation> {
    const data = await this.locationDatabaseRepository.findOne(id);

    if (!data) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }
    return data;
  }

  async update(
    id: number,
    data: Partial<ILocation>,
    userId: number,
  ): Promise<ILocation> {
    const location = await this.findOne(id);
    const locationM = this.parseEntityToModel(location);
    locationM.update(data);
    locationM.updatedBy = userId;
    return await this.locationDatabaseRepository.update(id, locationM);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.locationDatabaseRepository.delete(id);
  }

  private parseEntityToModel(data: ILocation): LocationModel {
    return new LocationModel(
      data.name,
      data.description,
      data.code,
      data.createdBy,
      data.updatedBy,
      data.createdAt,
      data.updatedAt,
    );
  }
}
