import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvService } from './env.service';
import { envSchema } from './env.validation';
import { AuthModule } from 'src/app/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import customerModel from 'src/infra/mongo/models/customer.model';
import readingModel from 'src/infra/mongo/models/reading.model';
import logModel from 'src/infra/mongo/models/log.model';
import utilityCompanyModel from 'src/infra/mongo/models/utility_company.model';

@Global()
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_MONGO'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'Customer', schema: customerModel.schema },
      { name: 'Reading', schema: readingModel.schema },
      { name: 'Log', schema: logModel.schema },
      { name: 'UtilityCompany', schema: utilityCompanyModel.schema }
    ]),
  ],
  exports: [PrismaModule, MongooseModule],
  providers: [EnvService],
})
export class CoreModule {}
