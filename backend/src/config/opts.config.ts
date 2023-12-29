import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';
import { AppConfig } from './';


 const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.required(),
  PORT: Joi.number().default(3000),
  MONGO_DB_HOST_URI: Joi.string(),
  MONGO_DB_COLLECTION: Joi.string().required(),
});

export const configOpts: ConfigModuleOptions = {
  load: [AppConfig],
  validationSchema: JoiValidationSchema
};