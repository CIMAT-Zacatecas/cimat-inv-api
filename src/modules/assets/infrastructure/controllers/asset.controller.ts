// filepath: /home/arnold/Dev/cimat-inv-api/src/modules/assets/infrastructure/controllers/asset.controller.ts
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
import { AssetService } from '../../domain/services/asset.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IAsset } from '../../domain/interfaces/asset.interface';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { BASE_PREFIX_API } from 'config/magicVariables';
import { CreateAssetCommand } from '../commands/create-asset.command';
import { UpdateAssetCommand } from '../commands/update-asset.command';
import { AssetSearchCommand } from '../commands/search-asset.command';
import { JwtAuthGuard } from 'src/lib/guards/jwt-auth.guard';

@ApiTags('Assets')
@ApiBearerAuth()
@Controller(`${BASE_PREFIX_API}/assets`)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @ApiTags('Assets')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new asset' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The asset has been successfully created.',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() createAssetDto: CreateAssetCommand,
  ): Promise<IAsset> {
    const userId = req.user.id;
    return await this.assetService.create(createAssetDto, userId);
  }

  @ApiTags('Assets')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all assets' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all assets',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: AssetSearchCommand,
  ): Promise<IAsset[] | IPagination<IAsset>> {
    return await this.assetService.findAll(query);
  }

  @ApiTags('Assets')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get asset by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return an asset',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<IAsset> {
    return await this.assetService.findOne(id);
  }

  @ApiTags('Assets')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update asset' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The asset has been successfully updated.',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssetDto: UpdateAssetCommand,
  ): Promise<IAsset> {
    const userId = req.user.id;
    return await this.assetService.update(id, updateAssetDto, userId);
  }

  @ApiTags('Assets')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete asset' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The asset has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.assetService.remove(id);
  }
}
