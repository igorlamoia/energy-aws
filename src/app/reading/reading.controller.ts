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
    const parsed = CreateReadingSchema.safeParse(body);
    if (!parsed.success) {
      throw new Error(JSON.stringify(parsed.error.format()));
    }

    return this.readingService.create(parsed.data);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.readingService.findOne(id);
  }

  @Get()
  async findAll(): Promise<IResponse<Prisma.ReadingUncheckedCreateInput[]>> {
    return {
      message: 'Readings fetched successfully',
      data: await this.readingService.findAll(),
    };
  }
}
