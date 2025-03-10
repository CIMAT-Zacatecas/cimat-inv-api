import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSubLocationCommand {
  @ApiProperty({
    description: 'Sub-location name',
    example: 'Room 101',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Sub-location code',
    example: 'R101',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  code: string;

  @ApiProperty({
    description: 'Sub-location description',
    example: 'First room on the left',
    required: false,
  })
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiProperty({
    description: 'Location id',
    example: 1,
  })
  @IsNotEmpty()
  locationId: number;
}
