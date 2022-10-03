import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { appConfig } from './utils/startup-config-service';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthorizationModule } from './authorization/authorization.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  const docsOptions = new DocumentBuilder()
    .setTitle('Pick A Buddy')
    .setDescription('The PAB API description')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  app.enableCors();
  const document = SwaggerModule.createDocument(app, docsOptions, {
  });

  SwaggerModule.setup('api', app, document);
  await app.listen(+appConfig.get('PORT', '3001'));
}
bootstrap();
