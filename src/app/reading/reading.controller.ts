import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ReadingService } from './reading.service';
import {
  CreateReadingSchema,
  CreateReadingDto,
} from './schemas/reading.schema';
import { Prisma } from '@prisma/client';
import { IResponse } from 'src/core/response.interface';

@Controller('readings')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  async create(@Body() body: CreateReadingDto) {
    const dto = CreateReadingSchema.parse(body);

    return this.readingService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.readingService.findOne(id);
  }

  @Get('hardware/:id_hardware')
  async findByHardware(
    @Param('id_hardware', ParseIntPipe) id_hardware: number,
  ) {
    const readings = await this.readingService.findByHardware(id_hardware);
    return {
      message: 'Readings fetched successfully',
      data: readings,
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
