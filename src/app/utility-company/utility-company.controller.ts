import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UtilityCompanyService } from './utility-company.service';
import { ParsedBody } from 'src/core/parse-body';
import {
  UtilityCompanyDto,
  UtilityCompanySchema,
} from './schemas/utility-company.schema';

@Controller('utility-company')
export class UtilityCompanyController {
  constructor(private readonly utilityCompanyService: UtilityCompanyService) {}

  @Post()
  @HttpCode(201)
  create(@ParsedBody(UtilityCompanySchema) dto: UtilityCompanyDto) {
    return this.utilityCompanyService.create(dto);
  }

  @Get()
  findAll() {
    return this.utilityCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilityCompanyService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUtilityCompanyDto: UtilityCompanyDto,
  ) {
    return this.utilityCompanyService.update(+id, updateUtilityCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilityCompanyService.remove(+id);
  }

  @Get('state/:id_state')
  findByStateId(@Param('id_state') id_state: string) {
    return this.utilityCompanyService.findByStateId(+id_state);
  }
}
