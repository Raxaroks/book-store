import { Module } from '@nestjs/common';
import { MongodbConfigService } from './mongo/mongodb.config.service';
import { ConfigModule } from '@nestjs/config';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id/parse-mongo-id.pipe';


@Module({
  imports: [ConfigModule],
  providers: [MongodbConfigService]
})
export class SharedModule {}
