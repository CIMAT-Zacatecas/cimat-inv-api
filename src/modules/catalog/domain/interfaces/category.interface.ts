import { BaseEntity } from 'src/lib/abstracts/base.abstract';

export interface ICategory extends BaseEntity {
  name: string;
  description?: string;
  createdBy?: number;
  updatedBy?: number;
  // TODO: Agregar created_by y updated_by en camelcase
}
