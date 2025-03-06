import { ICategory } from '../interfaces/category.interface';

export class CategoryModel implements ICategory {
  id: number;

  name: string;

  description: string;

  createdBy: number;

  createdAt: Date;

  updatedBy: number;

  updatedAt: Date;

  constructor(
    name: string,
    description?: string,
    createdBy?: number,
    updatedBy?: number,
    createdAt?: Date,
    updatedAt?: Date,
    // TODO La agregamos? deletedAt?: Date,
  ) {
    this.name = name;
    this.description = description;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.updatedAt = updatedAt ? new Date(updatedAt) : new Date();
    // TODO La agregamos? this.deletedAt = deletedAt ? new Date(deletedAt) : undefined;
  }

  // TODO: Agregar metodo para actualizar todos los datos

  update(data: Partial<ICategory>): void {
    this.name = data.name;
    this.description = data.description;
    this.setUpdatedAt();
  }

  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
