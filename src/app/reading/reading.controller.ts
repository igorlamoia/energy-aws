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
  findAll() {
    return this.readingService.findAll();
  }
}
