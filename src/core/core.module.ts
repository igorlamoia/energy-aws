import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  exports: [PrismaModule],
})
export class CoreModule {}
