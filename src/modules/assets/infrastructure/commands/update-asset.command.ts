import { PartialType } from '@nestjs/swagger';
import { CreateAssetCommand } from './create-asset.command';

export class UpdateAssetCommand extends PartialType(CreateAssetCommand) {}
