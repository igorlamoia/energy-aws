import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from 'src/core/handle-errors';

import { EnvService } from 'src/core/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  const port = envService.get('PORT');
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(port, () => {
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`Environment: ${envService.get('NODE_ENV')}`);
  });
}
bootstrap();
