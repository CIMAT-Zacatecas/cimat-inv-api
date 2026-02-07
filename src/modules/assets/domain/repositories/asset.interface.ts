import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { IAsset } from '../interfaces/asset.interface';
import { AssetModel } from '../models/asset.model';
import { AssetSearchCommand } from '../../infrastructure/commands/search-asset.command';

export interface IAssetDatabaseRepository {
  findAll(query: AssetSearchCommand): Promise<IAsset[] | IPagination<IAsset>>;
  findOne(id: number): Promise<IAsset>;
  create(data: AssetModel): Promise<IAsset>;
  update(id: number, data: AssetModel): Promise<IAsset>;
  delete(id: number): Promise<void>;
}

export const IAssetDatabaseRepository = Symbol('IAssetDatabaseRepository');
