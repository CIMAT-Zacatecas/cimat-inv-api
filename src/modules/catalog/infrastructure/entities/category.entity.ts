import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey
} from 'sequelize-typescript';
import { ICategory } from '../../domain/interfaces/category.interface';
import { UserEntity } from 'src/modules/users/infrastructure/entities/user.entity';

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

  @ForeignKey(() => UserEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  created_by: number;


  // TODO: pasar a camelceslinttase
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
