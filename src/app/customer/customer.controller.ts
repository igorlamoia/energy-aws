import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  async findOne(@Param('id') id: number) {
    const customer = await this.customerService.findOne(Number(id));

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
  async update(@Param('id') id: number, @Body() body: CustomerDto) {
    const dto = CustomerSchema.parse(body);

    const customer = await this.customerService.update(Number(id), dto);
    return {
      message: 'Customer updated successfully',
      data: customer,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.customerService.delete(Number(id));
    return {
      message: 'Customer deleted successfully',
    };
  }
}
