import { BookSchema } from 'src/book/entities/book.entity';

export const factoryMiddleware = () => {
  const schema = BookSchema;

  // interceptors
  schema.pre('save', function () {
    this.name = this.name.toLowerCase();
    this.language = this.language.toLowerCase();    
  });      
  return schema;
}