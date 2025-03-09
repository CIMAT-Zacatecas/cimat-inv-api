import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { IAssetStatus } from '../interfaces/asset-status.interface';
import { AssetStatusModel } from '../models/asset-status.model';
import { AssetStatusSearchCommand } from '../../infrastructure/commands/search-asset-status.command';

export interface IAssetStatusDatabaseRepository {
  findAll(
    query: AssetStatusSearchCommand,
  ): Promise<IAssetStatus[] | IPagination<IAssetStatus>>;
  findOne(id: number): Promise<IAssetStatus>;
  create(data: AssetStatusModel): Promise<IAssetStatus>;
  update(id: number, data: AssetStatusModel): Promise<IAssetStatus>;
  delete(id: number): Promise<void>;
}

export const IAssetStatusDatabaseRepository = Symbol(
  'IAssetStatusDatabaseRepository',
);
