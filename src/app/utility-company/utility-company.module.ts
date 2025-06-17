import { Module } from '@nestjs/common';
import { UtilityCompanyService } from './utility-company.service';
import { UtilityCompanyController } from './utility-company.controller';

@Module({
  controllers: [UtilityCompanyController],
  providers: [UtilityCompanyService],
})
export class UtilityCompanyModule {}
