import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAssetDatabaseRepository } from '../repositories/asset.interface';
import { AssetModel } from '../models/asset.model';
import { IAsset } from '../interfaces/asset.interface';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { AssetSearchCommand } from '../../infrastructure/commands/search-asset.command';

@Injectable()
export class AssetService {
  constructor(
    @Inject(IAssetDatabaseRepository)
    private readonly assetDatabaseRepository: IAssetDatabaseRepository,
  ) {}

  async create(data: Partial<IAsset>, userId: number): Promise<IAsset> {
    const assetM = new AssetModel(
      data.primaryId,
      data.secondaryId,
      data.barcode,
      data.description,
      data.locationId,
      data.subLocationId,
      data.responsibleId,
      data.subResponsibleId,
      data.statusId,
      data.categoryId,
      data.registrationDate,
      userId,
    );
    return await this.assetDatabaseRepository.create(assetM);
  }

  async findAll(
    query: AssetSearchCommand,
  ): Promise<IAsset[] | IPagination<IAsset>> {
    return await this.assetDatabaseRepository.findAll(query);
  }

  async findOne(id: number): Promise<IAsset> {
    const data = await this.assetDatabaseRepository.findOne(id);

    if (!data) {
      throw new NotFoundException(`Asset with id ${id} not found`);
    }
    return data;
  }

  async update(
    id: number,
    data: Partial<IAsset>,
    userId: number,
  ): Promise<IAsset> {
    const asset = await this.findOne(id);
    const assetM = this.parseEntityToModel(asset);
    assetM.update(data);
    assetM.updatedBy = userId;
    return await this.assetDatabaseRepository.update(id, assetM);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.assetDatabaseRepository.delete(id);
  }

  private parseEntityToModel(data: IAsset): AssetModel {
    return new AssetModel(
      data.primaryId,
      data.secondaryId,
      data.barcode,
      data.description,
      data.locationId,
      data.subLocationId,
      data.responsibleId,
      data.subResponsibleId,
      data.statusId,
      data.categoryId,
      data.registrationDate,
      data.createdBy,
      data.updatedBy,
      data.createdAt,
      data.updatedAt,
    );
  }
}
