import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReadingModule } from './reading/reading.module';
import { CoreModule } from 'src/core/core.module';
import { CustomerModule } from './customer/customer.module';
import { HardwareModule } from './hardware/hardware.module';
import { UtilityCompanyModule } from './utility-company/utility-company.module';

@Module({
  imports: [
    CoreModule,
    ReadingModule,
    CustomerModule,
    HardwareModule,
    UtilityCompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
