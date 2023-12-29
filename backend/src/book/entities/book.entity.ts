import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export interface IBook {
  id: string;
  name: string;
  isbn: string;
  author: string;
  publisher: string;
  releaseDate: Date;
  language: string;
  price: number;
  stock: number;
  img?: string;
  topics: string[];

}

@Schema({
  toJSON: {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Book extends Document {
  id: string;

  @Prop({ index: true, required: true, unique: true })
  name: string;

  @Prop({ index: true, required: true, unique: true })
  isbn: string;

  @Prop({ default: 'Anonymous' })
  author: string;

  @Prop()
  publisher: string;

  @Prop()
  publication: number;

  @Prop()
  language: string;

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  img?: string;

  @Prop([String])
  topics: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
