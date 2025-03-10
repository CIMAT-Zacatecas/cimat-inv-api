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
import { SubLocationService } from '../../domain/services/sub-location.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ISubLocation } from '../../domain/interfaces/sub-location.interface';
import { IPagination } from 'src/lib/interfaces/pagination.interface';
import { BASE_PREFIX_API } from 'config/magicVariables';
import { CreateSubLocationCommand } from '../commands/create-sub-location.command';
import { UpdateSubLocationCommand } from '../commands/update-sub-location.command';
import { SubLocationSearchCommand } from '../commands/search-sub-location.command';
import { JwtAuthGuard } from 'src/lib/guards/jwt-auth.guard';

@ApiTags('SubLocations')
@ApiBearerAuth()
@Controller(`${BASE_PREFIX_API}/sub-locations`)
export class SubLocationController {
  constructor(private readonly subLocationService: SubLocationService) {}

  @ApiTags('SubLocations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new sub-location' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The sub-location has been successfully created.',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() createSubLocationDto: CreateSubLocationCommand,
  ): Promise<ISubLocation> {
    const userId = req.user.id;
    return await this.subLocationService.create(createSubLocationDto, userId);
  }

  @ApiTags('SubLocations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all sub-locations' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all sub-locations',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() query: SubLocationSearchCommand,
  ): Promise<ISubLocation[] | IPagination<ISubLocation>> {
    return await this.subLocationService.findAll(query);
  }

  @ApiTags('SubLocations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get sub-location by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a sub-location',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ISubLocation> {
    return await this.subLocationService.findOne(id);
  }

  @ApiTags('SubLocations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update sub-location' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The sub-location has been successfully updated.',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubLocationDto: UpdateSubLocationCommand,
  ): Promise<ISubLocation> {
    const userId = req.user.id;
    return await this.subLocationService.update(
      id,
      updateSubLocationDto,
      userId,
    );
  }

  @ApiTags('SubLocations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete sub-location' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The sub-location has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.subLocationService.remove(id);
  }
}
