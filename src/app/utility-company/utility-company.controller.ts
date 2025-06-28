import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UtilityCompanyService } from './utility-company.service';
import { ParsedBody } from 'src/core/parse-body';
import {
  UtilityCompanyDto,
  UtilityCompanySchema,
} from './schemas/utility-company.schema';
import { BaseQueryParams } from 'src/core/schema';

@Controller('utility-company')
export class UtilityCompanyController {
  constructor(private readonly utilityCompanyService: UtilityCompanyService) {}

  @Post()
  @HttpCode(201)
  create(
    @ParsedBody(UtilityCompanySchema) dto: UtilityCompanyDto,
    @Query() query: BaseQueryParams,
  ) {
    return this.utilityCompanyService.create(query.db, dto);
  }

  @Get()
  findAll(@Query() query: BaseQueryParams) {
    return this.utilityCompanyService.findAll(query.db);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: BaseQueryParams) {
    return this.utilityCompanyService.findOne(query.db, +id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUtilityCompanyDto: UtilityCompanyDto,
    @Query() query: BaseQueryParams,
  ) {
    return this.utilityCompanyService.update(query.db, +id, updateUtilityCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query() query: BaseQueryParams) {
    return this.utilityCompanyService.remove(query.db, +id);
  }

  @Get('state/:id_state')
  findByStateId(
    @Param('id_state') id_state: string,
    @Query() query: BaseQueryParams,
  ) {
    return this.utilityCompanyService.findByStateId(query.db, +id_state);
  }
}
