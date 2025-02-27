import { ICategory } from '../interfaces/category.interface';

export class CategoryModel implements ICategory {
  id: number;

  name: string;

  description?: string;

  created_by?: number;

  created_at?: Date;

  updated_by?: number;

  updated_at?: Date;
  
  createdAt: Date;

  updatedAt: Date;

  // TODO: pasar todos los campos a camelcase y agregarlos al constructor
  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  // TODO: Agregar metodo para actualizar todos los datos

  setUpdatedAt() {
    this.updated_at = new Date();
  }
}
