import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [CoreModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
