import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  Customer,
  CustomerSchema,
  Log,
  Reading,
  ReadingSchema,
  State,
  StateSchema,
  UtilityCompany,
  UtilityCompanySchema,
  LogSchema,
} from 'src/infra/mongo/schemas';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        mongoose.set('debug', true);
        return {
          uri: configService.get<string>('DATABASE_URL_MONGO'),
          dbName: 'white_tariff',

        }
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: UtilityCompany.name, schema: UtilityCompanySchema },
      { name: State.name, schema: StateSchema },
      { name: Reading.name, schema: ReadingSchema },
      { name: Log.name, schema: LogSchema },
    ]),
  ],
  exports: [MongooseModule],
  providers: [],
})
export class MongoModule {}
