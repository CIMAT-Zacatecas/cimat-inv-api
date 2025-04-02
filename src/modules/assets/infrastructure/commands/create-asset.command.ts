import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateAssetCommand {
  @IsNotEmpty()
  @IsNumber()
  primaryId: number;

  @IsNotEmpty()
  @IsNumber()
  secondaryId: number;

  @IsNotEmpty()
  @IsString()
  barcode: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  locationId: number;

  @IsNotEmpty()
  @IsNumber()
  subLocationId: number;

  @IsNotEmpty()
  @IsNumber()
  responsibleId: number;

  @IsNotEmpty()
  @IsNumber()
  subResponsibleId: number;

  @IsNotEmpty()
  @IsNumber()
  statusId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsDate()
  registrationDate: Date;
}
