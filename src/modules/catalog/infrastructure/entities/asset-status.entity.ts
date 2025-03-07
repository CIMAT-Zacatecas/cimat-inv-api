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
import { IAssetStatus } from '../../domain/interfaces/asset-status.interface';

@Table({ tableName: 'asset_statuses' })
export class AssetStatusEntity extends Model<IAssetStatus> {
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

  // TODO deberia hacer referencia a la tabla de usuarios???
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
