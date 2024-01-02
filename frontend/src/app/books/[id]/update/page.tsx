'use client';
import { BookForm } from '@/app/components/BookForm/BookForm'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { BookService } from '../../services/book.service';
import { IBook } from '@/types/models/book.interface';
import { toTitleCase } from '@/helpers';
import Loading from '../loading';


const UpdateBookPage = () => {
  const pathname = usePathname();
	const id = pathname.split('/').at(2) || '';
  const [book, setBook] = useState<IBook | undefined>(undefined);
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    const fetchData = async () => {
      const bookService = new BookService();
      const response = await bookService.findOne(id);
      response.name = toTitleCase(response.name);
      setBook(response);
      setLoading(false);
    }

    fetchData();
  }, [id] );

  if (loading) return <Loading />
  else {
    if (!book) return <h4>Oops! Something went wrong, the book cannot be found.</h4>

    return (
      <BookForm mode='update' title='Update book' initialValues={ book } />
    )
  }  
}

export default UpdateBookPage