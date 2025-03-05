import { ICategory } from '../interfaces/category.interface';

export class CategoryModel implements ICategory {
  id: number;

  name: string;

  description?: string;

  createdBy?: number;

  createdAt: Date;

  updatedBy?: number;

  updatedAt: Date;

  constructor(
    name: string,
    description?: string,
    createdBy?: number,
    updatedBy?: number,
  ) {
    this.name = name;
    this.description = description;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // TODO: Agregar metodo para actualizar todos los datos

  update(data: Partial<ICategory>): void {
    this.name = data.name;
    this.description = data.description;
    this.updatedBy = data.updatedBy;
    this.setUpdatedAt();
  }

  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
