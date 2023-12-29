import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { factoryMiddleware } from 'src/shared/mongo';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Book.name,
        useFactory: factoryMiddleware
      }
    ])
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
