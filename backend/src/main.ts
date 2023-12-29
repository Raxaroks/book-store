import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfig, globalOpts } from './config';


async function bootstrap() {
  const { port } = AppConfig();
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes( new ValidationPipe(globalOpts) );
  app.enableCors();
  await app.listen(port);
  logger.log(`Server running and listening on port: ${port}`);
}
bootstrap();
