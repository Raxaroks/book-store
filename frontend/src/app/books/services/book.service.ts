import HttpService from '@/app/services/http.service';
import AppConfig from '@/config/app.config';
import { IBook } from '@/types/models/book.interface';

export class BookService {
  private baseUrl: string;
  private http: HttpService;  

  constructor() {
    this.baseUrl = ` ${ AppConfig().api.books }/book`;
    this.http = new HttpService();
  }

  async findAll(limit: number = 10, page: number = 1) {
    try {
      const data = await this.http.get<{ total: number, page: number, books: IBook[] }>(this.baseUrl, { limit, page });
      return data;
    } catch (error) {
      console.warn(error)
      throw new Error('Unexpected error')
    }
  }

  async findOne(id: string) {
    try {
      const url = `${this.baseUrl}/${id}`;
      const data = await this.http.get<IBook>(url);
      return data;
    } catch (error) {
      console.warn(error)
      throw new Error('Unexpected error')
    }
  }

  async delete(id: string) {
    try {
      const url = `${this.baseUrl}/${id}`;
      await this.http.delete<void>(url);
    } catch (error) {
      console.warn(error)
      throw new Error('Unexpected error')
    }
  }
}
