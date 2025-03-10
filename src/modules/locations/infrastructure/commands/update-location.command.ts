import { PartialType } from '@nestjs/swagger';
import { CreateLocationCommand } from './create-location.command';

export class UpdateLocationCommand extends PartialType(CreateLocationCommand) {}
