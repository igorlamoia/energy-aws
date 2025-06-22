import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  HttpCode,
  Query,
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
    const readings = await this.readingService.findByHardware(id_hardware, query);
    return {
      message: 'Readings fetched successfully',
      ...readings,
    };
  }

  @Get()
  async findAll(): Promise<IResponse<Prisma.ReadingUncheckedCreateInput[]>> {
    return {
      message: 'Readings fetched successfully',
      data: await this.readingService.findAll(),
    };
  }
}
