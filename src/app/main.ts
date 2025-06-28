import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from 'src/core/handle-errors';

import { EnvService } from 'src/core/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  const port = envService.get('PORT');
  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
  .setTitle('White Tariff Performance API')
  .setDescription('Query and manage readings for the White Tariff Performance project.')
  .setVersion('1.0')
  .build();

   
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port, () => {
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`Environment: ${envService.get('NODE_ENV')}`);
    console.log(`Documentation available at: http://localhost:${port}/api`);
  });
}
bootstrap();
