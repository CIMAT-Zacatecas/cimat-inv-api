import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAssetStatusDatabaseRepository } from '../repositories/asset-status.interface';
import { AssetStatusModel } from '../models/asset-status.model';
import { IAssetStatus } from '../interfaces/asset-status.interface';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { AssetStatusSearchCommand } from '../../infrastructure/commands/search-asset-status.command';

@Injectable()
export class AssetStatusService {
  constructor(
    @Inject(IAssetStatusDatabaseRepository)
    private readonly AssetStatusDatabaseRepository: IAssetStatusDatabaseRepository,
  ) {}

  async create(
    data: Partial<IAssetStatus>,
    userId: number,
  ): Promise<IAssetStatus> {
    const AssetStatusM = new AssetStatusModel(
      data.name,
      data.description,
      userId,
    );
    return await this.AssetStatusDatabaseRepository.create(AssetStatusM);
  }

  async findAll(
    query: AssetStatusSearchCommand,
  ): Promise<IAssetStatus[] | IPagination<IAssetStatus>> {
    return await this.AssetStatusDatabaseRepository.findAll(query);
  }

  async findOne(id: number): Promise<IAssetStatus> {
    const data = await this.AssetStatusDatabaseRepository.findOne(id);

    if (!data) {
      throw new NotFoundException(`AssetStatus with id ${id} not found`);
    }
    return data;
  }

  async update(
    id: number,
    data: Partial<IAssetStatus>,
    userId: number,
  ): Promise<IAssetStatus> {
    const AssetStatus = await this.findOne(id);
    const AssetStatusM = this.parseEntityToModel(AssetStatus);
    AssetStatusM.update(data);
    AssetStatusM.updatedBy = userId;
    return await this.AssetStatusDatabaseRepository.update(id, AssetStatusM);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.AssetStatusDatabaseRepository.delete(id);
  }

  // TODO: crear parseEntityToModel como en el Todos service
  private parseEntityToModel(data: IAssetStatus): AssetStatusModel {
    return new AssetStatusModel(
      data.name,
      data.description,
      data.createdBy,
      data.updatedBy,
      data.createdAt,
      data.updatedAt,
    );
  }
}
