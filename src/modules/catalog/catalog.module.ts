import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryEntity } from './infrastructure/entities/category.entity';
import { CategoryController } from './infrastructure/controllers/category.controller';
import { CategoryService } from './domain/services/category.service';
import { ICategoryDatabaseRepository } from './domain/repositories/category.interface';
import { DatabaseCategoryRepository } from './infrastructure/repositories/category.repository';
import { AssetStatusEntity } from './infrastructure/entities/asset-status.entity';
import { AssetStatusService } from './domain/services/asset-status.service';
import { IAssetStatusDatabaseRepository } from './domain/repositories/asset-status.interface';
import { DatabaseAssetStatusRepository } from './infrastructure/repositories/asset-status.repository';
import { AssetStatusController } from './infrastructure/controllers/asset-status.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([CategoryEntity]),
    SequelizeModule.forFeature([AssetStatusEntity]),
  ],
  controllers: [CategoryController, AssetStatusController],
  providers: [
    CategoryService,
    {
      provide: ICategoryDatabaseRepository,
      useClass: DatabaseCategoryRepository,
    },
    AssetStatusService,
    {
      provide: IAssetStatusDatabaseRepository,
      useClass: DatabaseAssetStatusRepository,
    },
  ],
  exports: [CategoryService],
})
export class CatalogModule {}
