import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto, CustomerSchema } from './schemas/customer.schema';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll() {
    return {
      message: 'Customers fetched successfully',
      data: await this.customerService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customerService.findOne(id);

    return {
      message: 'Customer fetched successfully',
      data: customer,
    };
  }

  @Post()
  async create(@Body() body: CustomerDto) {
    const dto = CustomerSchema.parse(body);

    const customer = await this.customerService.create(dto);
    return {
      message: 'Customer created successfully',
      data: customer,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CustomerDto,
  ) {
    const dto = CustomerSchema.parse(body);

    const customer = await this.customerService.update(id, dto);
    return {
      message: 'Customer updated successfully',
      data: customer,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.customerService.delete(id);
    return {
      message: 'Customer deleted successfully',
    };
  }
}
