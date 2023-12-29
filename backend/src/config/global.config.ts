import { ValidationPipeOptions } from '@nestjs/common';

export const globalOpts: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: { enableImplicitConversion: true }
};
