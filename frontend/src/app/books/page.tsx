import { BookService } from './services/book.service';
import { BookThumbnail } from '../components/BookThumbnail/BookThumbnail';
import style from './books-page.module.css';


const bookService = new BookService();

const BooksListPage = async () => {
  const data = await bookService.findAll();
  return (
    <div className={ style.bookList }>
      {
        (data.books.length > 0)
          ? (data.books.map( book => (
            <BookThumbnail key={ book.id } book={ book } />
          ) ) )
          : (<h2>There&rsquo;s no books stored on DB.</h2>)
      }
    </div>
  )
}

export default BooksListPage