import { PartialType } from '@nestjs/swagger';
import { CreateSubLocationCommand } from './create-sub-location.command';

export class UpdateSubLocationCommand extends PartialType(
  CreateSubLocationCommand,
) {}
