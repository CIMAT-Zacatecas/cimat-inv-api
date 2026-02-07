import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { UserEntity } from 'src/modules/users/infrastructure/entities/user.entity';
import { IAsset } from '../../domain/interfaces/asset.interface';
import { SubLocationEntity } from 'src/modules/sub-locations/infrastructure/entities/sub-location.entity';
import { AssetStatusEntity } from 'src/modules/catalog/infrastructure/entities/asset-status.entity';
import { CategoryEntity } from 'src/modules/catalog/infrastructure/entities/category.entity';
import { LocationEntity } from 'src/modules/locations/infrastructure/entities/location.entity';

@Table({ tableName: 'assets' })
export class AssetEntity extends Model<IAsset> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: false,
  })
  primaryId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  secondaryId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  barcode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ForeignKey(() => LocationEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  locationId: number;

  @ForeignKey(() => SubLocationEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subLocationId: number;

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  responsibleId: number;

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subResponsibleId: number;

  @ForeignKey(() => AssetStatusEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId: number;

  @ForeignKey(() => CategoryEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  registrationDate: Date;

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdBy: number;

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  updatedBy: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
