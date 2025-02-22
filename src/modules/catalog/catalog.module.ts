import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryEntity } from './infrastructure/entities/category.entity';
import { CategoryController } from './infrastructure/controllers/category.controller';
import { CategoryService } from './domain/services/category.service';
import { ICategoryDatabaseRepository } from './domain/repositories/category.interface';
import { DatabaseCategoryRepository } from './infrastructure/repositories/category.repository';

@Module({
  imports: [SequelizeModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: ICategoryDatabaseRepository,
      useClass: DatabaseCategoryRepository,
    },
  ],
  exports: [CategoryService],
})
export class CatalogModule {}
