import { IsString, IsArray, IsDate, IsNumber, IsOptional, MinLength, Min } from 'class-validator';


export class CreateBookDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(5)
  isbn: string;

  @IsString()
  @MinLength(3)
  author: string;

  @IsString()
  @MinLength(5)
  publisher: string;

  @IsNumber()
  @Min(1)
  publication: number;

  @IsString()
  language: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  img?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  topics: string[];
}
