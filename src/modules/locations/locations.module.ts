import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocationEntity } from './infrastructure/entities/location.entity';
import { ILocationDatabaseRepository } from './domain/repositories/location.interface';
import { LocationController } from './infrastructure/controllers/location.controller';
import { LocationService } from './domain/services/location.service';
import { DatabaseLocationRepository } from './infrastructure/repositories/location.repository';

@Module({
  imports: [SequelizeModule.forFeature([LocationEntity])],
  controllers: [LocationController],
  providers: [
    LocationService,
    {
      provide: ILocationDatabaseRepository,
      useClass: DatabaseLocationRepository,
    },
  ],
  exports: [LocationService],
})
export class LocationsModule {}
