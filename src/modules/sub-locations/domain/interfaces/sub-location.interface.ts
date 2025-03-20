import { BaseEntity } from 'src/lib/abstracts/base.abstract';

export interface ISubLocation extends BaseEntity {
  createdBy: number;
  updatedBy: number;
  description: string;
  locationId: number;
  code: string;
  name: string;
}
