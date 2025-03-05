import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { ICategory } from '../../domain/interfaces/category.interface';
import { UserEntity } from 'src/modules/users/infrastructure/entities/user.entity';

@Table({ tableName: 'categories' })
export class CategoryEntity extends Model<ICategory> {
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

  // TODO: pasar a camelceslinttase
  @CreatedAt
  createdAt: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  updatedBy: number;

  @UpdatedAt
  updatedAt: Date;
}
