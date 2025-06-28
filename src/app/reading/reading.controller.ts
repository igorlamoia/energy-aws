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
  CreateReadingSchema,
  ReadingQueryParams,
} from './schemas/reading.schema';
import { ParsedBody } from 'src/core/parse-body';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { BaseQueryParams } from 'src/core/schema';

@Controller('readings')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({type: CreateReadingSchema})
  @ApiResponse({ status: 201, description: 'Reading created successfully' })
  async create(@ParsedBody(CreateReadingZodSchema) dto: CreateReadingDto, @Query() query: BaseQueryParams) {
    return {
      message: 'Reading created successfully',
      ...await this.readingService.create(dto, query.db),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Query() query: BaseQueryParams) {
    return {
      message: 'Reading fetched successfully',
      ...await this.readingService.findOne(id, query.db),
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @ParsedBody(CreateReadingZodSchema) dto: CreateReadingDto,
    @Query() query: Record<string, any>
  ) {
    return {
      message: 'Reading updated successfully',
      ... await this.readingService.update(id, dto, query.db)
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Query() query: Record<string, any>) {
    return {
      message: 'Reading deleted successfully',
      ... await this.readingService.delete(id, query.db)
    };
  }

  @Get()
  async findAll(
    @Query() query: ReadingQueryParams,
  ) {
    return {
      message: 'Readings fetched successfully',
      ...await this.readingService.findAll(query, query.db)
    };
  }
}
