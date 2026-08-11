import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  cookieParser from "cookie-parser";

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('School Portal API')
    .setDescription('School management system API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.use(cookieParser())

  app.enableCors({
    origin: ' http://localhost:5173',
    credentials: true,
  });

  await app.listen(8000);
}

bootstrap();
