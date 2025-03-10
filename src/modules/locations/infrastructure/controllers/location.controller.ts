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
import { LocationService } from '../../domain/services/location.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ILocation } from '../../domain/interfaces/location.interface';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { BASE_PREFIX_API } from 'config/magicVariables';
import { CreateLocationCommand } from '../commands/create-location.command';
import { UpdateLocationCommand } from '../commands/update-location.command';
import { LocationSearchCommand } from '../commands/search-location.command';
import { JwtAuthGuard } from 'src/lib/guards/jwt-auth.guard';

@ApiTags('Locations')
@ApiBearerAuth()
@Controller(`${BASE_PREFIX_API}/locations`)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiTags('Locations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The location has been successfully created.',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() createLocationDto: CreateLocationCommand,
  ): Promise<ILocation> {
    const userId = req.user.id;
    return await this.locationService.create(createLocationDto, userId);
  }

  @ApiTags('Locations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all locations',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: LocationSearchCommand,
  ): Promise<ILocation[] | IPagination<ILocation>> {
    return await this.locationService.findAll(query);
  }

  @ApiTags('Locations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get location by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a location',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ILocation> {
    return await this.locationService.findOne(id);
  }

  @ApiTags('Locations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update location' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The location has been successfully updated.',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocationDto: UpdateLocationCommand,
  ): Promise<ILocation> {
    const userId = req.user.id;
    return await this.locationService.update(id, updateLocationDto, userId);
  }

  @ApiTags('Locations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete location' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The location has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.locationService.remove(id);
  }
}
