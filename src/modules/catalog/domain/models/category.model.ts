import { ICategory } from '../interfaces/category.interface';

export class CategoryModel implements ICategory {
  id: number;

  name: string;

  description?: string;

  created_by?: number;

  created_at?: Date;

  updated_by?: number;

  updated_at?: Date;

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  createdAt: Date;

  updatedAt: Date;

  setUpdatedAt() {
    this.updated_at = new Date();
  }
}
