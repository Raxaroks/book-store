import { Controller, Post, Body, Delete, HttpCode, HttpStatus, Param, Get, Query, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { ParseMongoIdPipe } from 'src/shared/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateBookDto, UpdateBookDto } from './dto';


@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create( @Body() createBookDto: CreateBookDto ) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll( @Query() query: PaginationDto ) {
    return this.bookService.findAll(query);
  }

  @Get(':key')
  findOne( @Param('key') key: string ) {
    return this.bookService.findOne(key);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateBookDto: UpdateBookDto
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete( @Param('id', ParseMongoIdPipe) id: string ) {
    return this.bookService.delete(id)
  }
}
