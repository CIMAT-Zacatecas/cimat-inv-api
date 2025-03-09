import { BaseEntity } from 'src/lib/abstracts/base.abstract';

export interface ILocation extends BaseEntity {
  description: string;
  createdBy: number;
  updatedBy: number;
  code: string;
  name: string;
}
