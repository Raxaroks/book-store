
export interface IBook {
  id?: string;
  name: string;
  isbn: string;
  author: string;
  publisher: string;
  publication: number;
  language: string;
  price: number;
  stock: number;
  topics: string[];
  img?: string;
}
