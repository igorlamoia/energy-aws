import {
  Controller,
  Post,
  Get,
  Param,
  HttpCode,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ReadingService } from './reading.service';
import {
  CreateReadingZodSchema,
  CreateReadingDto,
  ReadingQueryParams,
  CreateUpdateReading,
  validateConditionalFields,
} from './schemas/reading.schema';
import { ParsedBody } from 'src/core/parse-body';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { BaseQueryParams } from 'src/core/schema';

@Controller('readings')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Get()
  async findAll(
    @Query() query: ReadingQueryParams,
  ) {
    return {
      message: 'Readings fetched successfully',
      ...await this.readingService.findAll(query)
    };
  }

  @Post()
  @HttpCode(201)
  @ApiBody(CreateUpdateReading)
  @ApiResponse({ status: 201, description: 'Reading created successfully' })
  async create(@ParsedBody(CreateReadingZodSchema) dto: CreateReadingDto, @Query() query: BaseQueryParams) {
    validateConditionalFields(dto, query.db);
    return {
      message: 'Reading created successfully',
      ...await this.readingService.create(dto, query.db),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query: BaseQueryParams) {
    return {
      message: 'Reading fetched successfully',
      ...await this.readingService.findOne(id, query.db),
    }
  }

  @Put(':id')
  @ApiBody(CreateUpdateReading)
  async update(
    @Param('id') id: string,
    @ParsedBody(CreateReadingZodSchema) dto: CreateReadingDto,
    @Query() query: BaseQueryParams
  ) {
    validateConditionalFields(dto, query.db);
    return {
      message: 'Reading updated successfully',
      ... await this.readingService.update(id, dto, query.db)
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Query() query: BaseQueryParams) {
    return {
      message: 'Reading deleted successfully',
      ... await this.readingService.delete(id, query.db)
    };
  }
}
