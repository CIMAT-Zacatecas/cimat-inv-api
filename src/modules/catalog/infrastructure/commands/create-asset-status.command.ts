import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAssetStatusCommand {
  @ApiProperty({
    description: 'Asset status name',
    example: 'Something',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Asset status description',
    example: 'An asset status for electronic devices and accessories',
    required: false,
  })
  @IsString()
  @MaxLength(255)
  description?: string;
}
