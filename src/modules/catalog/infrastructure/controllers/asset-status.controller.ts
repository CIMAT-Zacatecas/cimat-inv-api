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
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { BASE_PREFIX_API } from 'config/magicVariables';
import { JwtAuthGuard } from 'src/lib/guards/jwt-auth.guard';
import { AssetStatusService } from '../../domain/services/asset-status.service';
import { IAssetStatus } from '../../domain/interfaces/asset-status.interface';
import { AssetStatusSearchCommand } from '../commands/search-asset-status.command';
import { CreateAssetStatusCommand } from '../commands/create-asset-status.command';
@ApiTags('Catalogs')
@ApiBearerAuth()
@Controller(`${BASE_PREFIX_API}/asset_statuses`)
export class AssetStatusController {
  constructor(private readonly assetStatusService: AssetStatusService) {}

  @ApiTags('Catalogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new asset status' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The asset status has been successfully created.',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() createAssetStatusDto: CreateAssetStatusCommand,
  ): Promise<IAssetStatus> {
    const userId = req.user.id;
    return await this.assetStatusService.create(createAssetStatusDto, userId);
  }

  @ApiTags('Catalogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all asset statuses' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all asset statuses',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: AssetStatusSearchCommand,
  ): Promise<IAssetStatus[] | IPagination<IAssetStatus>> {
    return await this.assetStatusService.findAll(query);
  }

  @ApiTags('Catalogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get an asset status by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return an asset status',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<IAssetStatus> {
    return await this.assetStatusService.findOne(id);
  }

  @ApiTags('Catalogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an asset status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The asset status has been successfully updated.',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssetStatusDto: CreateAssetStatusCommand,
  ): Promise<IAssetStatus> {
    const userId = req.user.id;
    return await this.assetStatusService.update(
      id,
      updateAssetStatusDto,
      userId,
    );
  }

  @ApiTags('Catalogs')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an asset status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The asset status has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.assetStatusService.remove(id);
  }
}
