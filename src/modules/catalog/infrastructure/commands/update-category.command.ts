import { PartialType } from '@nestjs/swagger';
import { CreateCategoryCommand } from './create-category.command';

export class UpdateCategoryCommand extends PartialType(CreateCategoryCommand) {}
