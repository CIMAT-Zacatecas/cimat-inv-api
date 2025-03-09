import { PartialType } from '@nestjs/swagger';
import { CreateCategoryCommand } from 'src/modules/catalog/infrastructure/commands/create-category.command';

export class UpdateLocationCommand extends PartialType(CreateCategoryCommand) {}
