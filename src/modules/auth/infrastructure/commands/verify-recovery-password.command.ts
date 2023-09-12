import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { EmailCommand } from '../../../../lib/commands/email.command';

export class VerifyRecoveryPasswordCommand extends PickType(EmailCommand, [
  'email',
] as const) {
  @ApiProperty()
  @IsNotEmpty({
    message: 'El código es requerido',
  })
  readonly code: string;
}
