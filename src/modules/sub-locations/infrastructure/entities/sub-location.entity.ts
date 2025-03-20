import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';

import { ISubLocation } from '../../domain/interfaces/sub-location.interface';
import { UserEntity } from 'src/modules/users/infrastructure/entities/user.entity';
import { LocationEntity } from 'src/modules/locations/infrastructure/entities/location.entity';

@Table({ tableName: 'sub_locations' })
export class SubLocationEntity extends Model<ISubLocation> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdBy: number;

  @CreatedAt
  createdAt: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  updatedBy: number;

  @UpdatedAt
  updatedAt: Date;

  @ForeignKey(() => LocationEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  locationId: number;
}
