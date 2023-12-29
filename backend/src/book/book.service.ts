import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from "mongoose";
import { Book, IBook } from './entities/book.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>
  ) {}

  private handleExceptions(error: any) {
    console.warn(error);
    if (error.code === 13) throw new UnauthorizedException(`Unauthorized operation. Check the server's MongoDB credentials`);
    if (error.code === 11000) throw new BadRequestException(`There is a book already stored with that key: [${ JSON.stringify(error.keyValue) }]`)
    throw new InternalServerErrorException('Unexpected error, check the server logs...');
  }

  async create(createBookDto: CreateBookDto) {
    try {
      const book = await this.bookModel.create({...createBookDto});
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Book created',
        book: book.toJSON()
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll({ limit = 5, page = 1 }: PaginationDto) {
    const count = await this.bookModel.countDocuments();
    let books = await this.bookModel.find()
                            .limit(limit * 1)
                            .skip((page - 1) * limit)
                            .sort({ name: 1 })
                            .exec();

    return {
      total: count,
      page,
      books: books.map( book => book.toJSON<IBook>() )
    }
  }

  async findOne(key: string) {
    let book: Book;
    if (isValidObjectId(key)) book = await this.bookModel.findById(key);
    if (!book) book = await this.bookModel.findOne({ name: key.toLowerCase() });
    if (!book) throw new NotFoundException(`No book found with the given param [key: ${ key }]`);
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    try {
      if (updateBookDto.name) updateBookDto.name = updateBookDto.name.toLowerCase();
      if (updateBookDto.language) updateBookDto.language = updateBookDto.language.toLowerCase();
      await book.updateOne(updateBookDto);
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Book updated',
        book: { ...book.toJSON(), ...updateBookDto }
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async delete(id: string) {
    const { deletedCount } = await this.bookModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException(`No book found with the given param [ID: ${id}]`);
    return;
  }
}
