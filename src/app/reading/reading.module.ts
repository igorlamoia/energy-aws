import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';

@Module({
  providers: [ReadingService],
  controllers: [ReadingController],
})
export class ReadingModule {}
