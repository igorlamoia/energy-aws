import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';
import { envSchema } from './env.validation';
import { AuthModule } from 'src/app/auth/auth.module';
import { MongoModule } from 'src/infra/mongo/mongo.module';

@Global()
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    MongoModule
  ],
  exports: [PrismaModule],
  providers: [EnvService],
})
export class CoreModule {}
