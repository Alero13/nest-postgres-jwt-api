import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  
  //Faltaban los CORS
  app.enableCors();

  const config = new DocumentBuilder()

    /* .setTitle("Cats example") */
    .setTitle("API de Gatos")

    /* .setDescription("The cats API description") */
    .setDescription("API REST de razas de gatos")

    .setVersion("1.0")

    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  
  //await app.listen(3000);
  await app.listen(parseInt(process.env.PORT) || 8000)
}


bootstrap();
