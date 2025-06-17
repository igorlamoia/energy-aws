import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { HardwareService } from './hardware.service';
import { ParsedBody } from 'src/core/parse-body';
import { HardwareDto, HardwareSchema } from './schemas/create-hardware.schema';

@Controller('hardwares')
export class HardwareController {
  constructor(private readonly hardwareService: HardwareService) {}

  @Post()
  create(@ParsedBody(HardwareSchema) dto: HardwareDto) {
    return this.hardwareService.create(dto);
  }

  @Get()
  findAll() {
    return this.hardwareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hardwareService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @ParsedBody(HardwareSchema) dto: HardwareDto,
  ) {
    return this.hardwareService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hardwareService.remove(+id);
  }

  @Get('residence/:id_residence')
  findByResidence(@Param('id_residence', ParseIntPipe) id_residence: number) {
    return this.hardwareService.findByResidence(id_residence);
  }
}
