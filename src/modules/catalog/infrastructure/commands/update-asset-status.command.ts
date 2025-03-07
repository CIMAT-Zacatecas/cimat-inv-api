import { PartialType } from '@nestjs/swagger';
import { CreateAssetStatusCommand } from './create-asset-status.command';

export class UpdateAssetStatusCommand extends PartialType(
  CreateAssetStatusCommand,
) {}
