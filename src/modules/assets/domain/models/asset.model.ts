import { IAsset } from '../interfaces/asset.interface';

export class AssetModel implements IAsset {
  id: number;

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

  createdAt: Date;

  updatedAt: Date;

  constructor(
    primaryId: number,
    secondaryId: number,
    barcode: string,
    description: string,
    locationId: number,
    subLocationId: number,
    responsibleId: number,
    subResponsibleId: number,
    statusId: number,
    categoryId: number,
    registrationDate: Date,
    createdBy: number,
    updatedBy?: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.primaryId = primaryId;
    this.secondaryId = secondaryId;
    this.barcode = barcode;
    this.description = description;
    this.locationId = locationId;
    this.subLocationId = subLocationId;
    this.responsibleId = responsibleId;
    this.subResponsibleId = subResponsibleId;
    this.statusId = statusId;
    this.categoryId = categoryId;
    this.registrationDate = new Date(registrationDate);
    this.createdBy = createdBy;
    this.updatedBy = updatedBy || null;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.updatedAt = updatedAt ? new Date(updatedAt) : new Date();
  }

  update(data: Partial<IAsset>): void {
    this.primaryId = data.primaryId;
    this.secondaryId = data.secondaryId;
    this.barcode = data.barcode;
    this.description = data.description;
    this.locationId = data.locationId;
    this.subLocationId = data.subLocationId;
    this.responsibleId = data.responsibleId;
    this.subResponsibleId = data.subResponsibleId;
    this.statusId = data.statusId;
    this.categoryId = data.categoryId;
    this.registrationDate = data.registrationDate;
    this.updatedBy = data.updatedBy;
    this.setUpdatedAt();
  }

  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}
