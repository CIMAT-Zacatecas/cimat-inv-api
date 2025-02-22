import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { ICategory } from '../../domain/interfaces/category.interface';

@Table({
  tableName: 'categories',
  underscored: true, // This tells Sequelize to use snake_case in DB
})
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

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  created_by: number;

  @CreatedAt // Use this decorator
  created_at: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  updated_by: number;

  @UpdatedAt // Use this decorator
  updated_at: Date;
}
