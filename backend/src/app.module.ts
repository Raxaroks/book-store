import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOpts } from './config';
import { SharedModule } from './shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbConfigService } from './shared/mongo/mongodb.config.service';
import { BookModule } from './book/book.module';


@Module({
  imports: [
    ConfigModule.forRoot(configOpts),
    SharedModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongodbConfigService
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
