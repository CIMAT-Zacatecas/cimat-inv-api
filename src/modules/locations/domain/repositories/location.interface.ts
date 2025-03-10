import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { ILocation } from '../interfaces/location.interface';
import { LocationModel } from '../models/location.model';
import { LocationSearchCommand } from '../../infrastructure/commands/search-location.command';

export interface ILocationDatabaseRepository {
  findAll(
    query: LocationSearchCommand,
  ): Promise<ILocation[] | IPagination<ILocation>>;
  findOne(id: number): Promise<ILocation>;
  create(data: LocationModel): Promise<ILocation>;
  update(id: number, data: LocationModel): Promise<ILocation>;
  delete(id: number): Promise<void>;
}

export const ILocationDatabaseRepository = Symbol(
  'ICategoryDatabaseRepository',
);
