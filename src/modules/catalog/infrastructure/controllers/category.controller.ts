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
  UseGuards,
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
import { JwtAuthGuard } from 'src/lib/guards/jwt-auth.guard';

@ApiTags('Catalogs')
@ApiBearerAuth()
@Controller(`${BASE_PREFIX_API}/categories`)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiTags('Catalogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The category has been successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryCommand,
  ): Promise<ICategory> {
    return await this.categoryService.create(createCategoryDto);
  }

  @ApiTags('Catalogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all categories',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: CategorySearchCommand,
  ): Promise<ICategory[] | IPagination<ICategory>> {
    return await this.categoryService.findAll(query);
  }

  @ApiTags('Catalogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a category',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ICategory> {
    return await this.categoryService.findOne(id);
  }

  @ApiTags('Catalogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The category has been successfully updated.',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryCommand,
  ): Promise<ICategory> {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @ApiTags('Catalogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The category has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.categoryService.remove(id);
  }
}
