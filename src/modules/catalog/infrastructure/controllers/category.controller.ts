import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from '../../domain/services/category.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ICategory } from '../../domain/interfaces/category.interface';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { BASE_PREFIX_API } from 'config/magicVariables';
import { CreateCategoryCommand } from '../commands/create-category.command';
import { UpdateCategoryCommand } from '../commands/update-category.command';
import { CategorySearchCommand } from '../commands/search-category.command';

@ApiTags('Catalog')
@ApiBearerAuth()
@Controller(`${BASE_PREFIX_API}/categories`)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The category has been successfully created.',
  })
  async create(
    @Body() createCategoryDto: CreateCategoryCommand,
  ): Promise<ICategory> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all categories',
  })
  async findAll(
    @Query() query: CategorySearchCommand,
  ): Promise<ICategory[] | IPagination<ICategory>> {
    return await this.categoryService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a category',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ICategory> {
    return await this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The category has been successfully updated.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryCommand,
  ): Promise<ICategory> {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The category has been successfully deleted.',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.categoryService.remove(id);
  }
}
