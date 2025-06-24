import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto, CustomerSchema } from './schemas/customer.schema';
import { ParsedBody } from 'src/core/parse-body';
import { JwtService } from '@nestjs/jwt';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private jwt: JwtService,
  ) {}

  @Get()
  async findAll(
    @Query() query: Record<string, any>,
  ) {
    return {
      message: 'Customers fetched successfully',
      data: await this.customerService.findAll(query.db),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Query() query: Record<string, any>) {
    const customer = await this.customerService.findOne(id, query.db);

    return {
      message: 'Customer fetched successfully',
      ...customer,
    };
  }

  @Post()
  @HttpCode(201)
  async create(@ParsedBody(CustomerSchema) dto: CustomerDto, @Query() query: Record<string, any>) {
    const customer = await this.customerService.create(dto, query.db);
    return {
      message: 'Customer created successfully',
      ...customer,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @ParsedBody(CustomerSchema) dto: CustomerDto,
    @Query() query: Record<string, any>
  ) {
    const customer = await this.customerService.update(id, dto, query.db);
    return {
      message: 'Customer updated successfully',
      ...customer,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Query() query: Record<string, any>) {
    await this.customerService.delete(id, query.db);
    return {
      message: 'Customer deleted successfully',
    };
  }
}
