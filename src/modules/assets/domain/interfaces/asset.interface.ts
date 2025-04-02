import { BaseEntity } from 'src/lib/abstracts/base.abstract';

export interface IAsset extends BaseEntity {
  primaryId: number;
  secondaryId: number;
  barcode: string;
  description: string;
  locationId: number;
  subLocationId: number;
  responsibleId: number;
  subResponsibleId: number;
  statusId: number;
  categoryId: number;
  registrationDate: Date;
  createdBy: number;
  updatedBy: number;
}
