import { ISubLocation } from '../interfaces/sub-location.interface';

export class SubLocationModel implements ISubLocation {
  id: number;

  code: string;

  name: string;

  description: string;

  createdBy: number;

  createdAt: Date;

  updatedBy: number;

  updatedAt: Date;

  locationId: number;

  constructor(
    code: string,
    name: string,
    locationId: number,
    description?: string,
    createdBy?: number,
    updatedBy?: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.code = code;
    this.name = name;
    this.locationId = locationId;
    this.description = description;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.updatedAt = updatedAt ? new Date(updatedAt) : new Date();
  }

  update(data: Partial<ISubLocation>): void {
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.setUpdatedAt();
  }

  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
