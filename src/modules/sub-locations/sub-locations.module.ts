import { Module } from '@nestjs/common';
import { SubLocationEntity } from './infrastructure/entities/sub-location.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISubLocationDatabaseRepository } from './domain/repositories/sub-location.interface';
import { DatabaseSubLocationRepository } from './infrastructure/repositories/sub-location.repository';
import { SubLocationService } from './domain/services/sub-location.service';
import { SubLocationController } from './infrastructure/controllers/sub-location.controller';

@Module({
  imports: [SequelizeModule.forFeature([SubLocationEntity])],
  controllers: [SubLocationController],
  providers: [
    {
      provide: ISubLocationDatabaseRepository,
      useClass: DatabaseSubLocationRepository,
    },
    SubLocationService,
  ],
  exports: [],
})
export class SubLocationsModule {}
