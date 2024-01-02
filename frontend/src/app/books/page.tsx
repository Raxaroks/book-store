'use client';
import { BookService } from './services/book.service';
import { BookThumbnail } from '../components/BookThumbnail/BookThumbnail';
import style from './books-page.module.css';
import { useEffect, useMemo, useState } from 'react';
import { IBook, Pagination } from '@/types/models';
import Loading from './loading';
import { toast } from 'react-toastify';

const bookService = new BookService();

const BooksListPage = () => {
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState<
		Pagination & { total: number; books: IBook[] }
	>({
		total: 0,
		limit: 3,
		page: 1,
		books: [],
	});

	const movePage = (amount: number = 1) => {
		const { page } = pagination;
		const newPage = page + amount;
		setPagination({
			...pagination,
			page: newPage !== 0 ? newPage : 1,
		});
	};

	const areMorePages = () => {
		const { total, limit, books, page } = pagination;

		const inPreviousPage = limit * (page - 1);
		const paginated = inPreviousPage + books!.length;

		if (paginated < total) return true;
		else return false;
	};

	const fetchBooks = useMemo(
		() => async () => {
			try {
				setLoading(true);
				const { limit, page } = pagination;
				const response = await bookService.findAll(limit, page);

				setLoading(false);
				setPagination({
					...pagination,
					books: response.books,
					total: response.total,
				});
			} catch (error) {
				console.warn(error);
				setLoading(false);

				// fire toast
        toast.error('Something went wrong! Try again...');
			}
		},
		[pagination.page]
	);

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	const { page, books } = pagination;

  if (!books) throw new Error('Unexpected error!')

  return (loading)
    ? <Loading/>
    : ( books.length > 0 )
      ? <>
         <div className={style.bookList}>
          {books.map((book) => (
            <BookThumbnail key={book.id} book={book} />
          ))}
        </div>
        <div className={ style.paginationActions }>
          <button className={ page === 1 ? style.disabledButton : '' }
            onClick={ () => movePage(-1) } disabled={ page === 1 } >Previous</button>
          <span>{ page }</span>
          <button className={ !areMorePages() ? style.disabledButton : '' }
            onClick={ () => movePage(1) } disabled={ !areMorePages() } >Next</button>
        </div>
      </>
      : <h3>There&rsquo;s no books stored on DB.</h3>;
};

export default BooksListPage;
