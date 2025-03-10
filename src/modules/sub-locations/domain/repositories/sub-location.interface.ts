import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { ISubLocation } from '../interfaces/sub-location.interface';
import { SubLocationModel } from '../models/sub-location.model';
import { SubLocationSearchCommand } from '../../infrastructure/commands/search-sub-location.command';

export interface ISubLocationDatabaseRepository {
  findAll(
    query: SubLocationSearchCommand,
  ): Promise<ISubLocation[] | IPagination<ISubLocation>>;
  findOne(id: number): Promise<ISubLocation>;
  create(data: SubLocationModel): Promise<ISubLocation>;
  update(id: number, data: SubLocationModel): Promise<ISubLocation>;
  delete(id: number): Promise<void>;
}

export const ISubLocationDatabaseRepository = Symbol(
  'ISubLocationDatabaseRepository',
);
