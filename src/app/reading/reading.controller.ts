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
import { Prisma } from '@prisma/client';
import { IResponse } from 'src/core/response.interface';
import { ParsedBody } from 'src/core/parse-body';

@Controller('readings')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  @HttpCode(201)
  async create(@ParsedBody(CreateReadingSchema) dto: CreateReadingDto) {
    return this.readingService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.readingService.findOne(id);
  }

  @Get('hardware/:id_hardware')
  async findByHardware(
    @Param('id_hardware', ParseIntPipe) id_hardware: number,
    @Query() query: Record<string, any>,
  ) {
    const readings = await this.readingService.findByHardware(
      id_hardware,
      query,
    );
    return {
      message: 'Readings fetched successfully',
      ...readings,
    };
  }

  @Get('utility-company/:id_utility_company')
  async findByUtilityCompany(
    @Param('id_utility_company', ParseIntPipe) id_utility_company: number,
    @Query() query: Record<string, any>,
  ) {
  const readings = await this.readingService.findByUtilityCompany(
      id_utility_company,
      query,
    );
    return {
      message: 'Readings fetched successfully',
      ...readings,
    };
  }

  @Get()
  async findAll(
    @Query() query: Record<string, any>,
  ): Promise<IResponse<Prisma.ReadingUncheckedCreateInput[]>> {
    const readings = await this.readingService.findAll(query)
    return {
      message: 'Readings fetched successfully',
      ...readings
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @ParsedBody(CreateReadingSchema) dto: CreateReadingDto,
  ) {
    return this.readingService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.readingService.delete(id);
  }
}
