import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
  providers: [ReadingService],
  controllers: [ReadingController, PrismaService],
})
export class ReadingModule {}
