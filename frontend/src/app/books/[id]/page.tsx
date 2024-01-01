'use client';
import { usePathname } from 'next/navigation';
import { BookService } from '../services/book.service';
import { BookDetails } from '@/app/components/BookDetails/BookDetails';


const bookService = new BookService();

const BookPage = () => {

	const pathname = usePathname();
	const id = pathname.split('/').pop() || '';

	return <BookDetails id={ id } service={ bookService } />
};

export default BookPage;
