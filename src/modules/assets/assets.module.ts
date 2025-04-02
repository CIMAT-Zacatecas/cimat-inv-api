import { SequelizeModule } from '@nestjs/sequelize';
import { AssetEntity } from './infrastructure/entities/asset.entity';
import { AssetController } from './infrastructure/controllers/asset.controller';
import { IAssetDatabaseRepository } from './domain/repositories/asset.interface';
import { DatabaseAssetRepository } from './infrastructure/repositories/asset.repository';
import { AssetService } from './domain/services/asset.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forFeature([AssetEntity])],
  controllers: [AssetController],
  providers: [
    AssetService,
    {
      provide: IAssetDatabaseRepository,
      useClass: DatabaseAssetRepository,
    },
  ],
  exports: [AssetService],
})
export class AssetsModule {}
