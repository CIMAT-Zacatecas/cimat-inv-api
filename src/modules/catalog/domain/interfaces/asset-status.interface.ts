import { BaseEntity } from 'src/lib/abstracts/base.abstract';

export interface IAssetStatus extends BaseEntity {
  name: string;
  description: string;
  createdBy?: number;
  updatedBy?: number;
}
