import {
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  HttpCode,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ReadingService } from './reading.service';
import {
  CreateReadingSchema,
  CreateReadingDto,
} from './schemas/reading.schema';
import { ParsedBody } from 'src/core/parse-body';

@Controller('readings')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  @HttpCode(201)
  async create(@ParsedBody(CreateReadingSchema) dto: CreateReadingDto, @Query() query: Record<string, any>) {
    return {
      message: 'Reading created successfully',
      ...await this.readingService.create(dto, query.db),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Query() query: Record<string, any>) {
    return {
      message: 'Reading fetched successfully',
      ...await this.readingService.findOne(id, query.db),
    }
  }

  @Get('hardware/:id_hardware')
  async findByHardware(
    @Param('id_hardware') id_hardware: number,
    @Query() query: Record<string, any>,
  ) {
    const readings = await this.readingService.findByHardware(
      id_hardware,
      query,
      query.db
    );
    return {
      message: 'Readings fetched successfully',
      ...readings,
    };
  }

  @Get('utility-company/:id_utility_company')
  async findByUtilityCompany(
    @Param('id_utility_company') id_utility_company: number,
    @Query() query: Record<string, any>,
  ) {
  const readings = await this.readingService.findByUtilityCompany(
      id_utility_company,
      query,
      query.db
    );
    return {
      message: 'Readings fetched successfully',
      ...readings,
    };
  }

  @Get()
  async findAll(
    @Query() query: Record<string, any>,
  ) {
    const readings = await this.readingService.findAll(query, query.db)
    return {
      message: 'Readings fetched successfully',
      ...readings
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @ParsedBody(CreateReadingSchema) dto: CreateReadingDto,
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
}
