import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLocationCommand {
  @ApiProperty({
    description: 'Location name',
    example: 'Building 3',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Location code',
    example: 'B3',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  code: string;

  @ApiProperty({
    description: 'Location description',
    example: 'On the top of the table',
    required: false,
  })
  @IsString()
  @MaxLength(255)
  description?: string;
}
