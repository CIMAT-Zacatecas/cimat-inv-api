import { BaseEntity } from 'src/lib/abstracts/base.abstract';

export interface ICategory extends BaseEntity {
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  // TODO: Agregar created_by y updated_by en camelcase
}
