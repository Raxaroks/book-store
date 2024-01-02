'use client';
import { useState } from 'react';
import style from './book-actions.module.css';
import { Modal } from '../Modal/Modal';
import { DeleteBookModal } from '../Modal/DeleteBookModal';
import { IBook } from '@/types/models/book.interface';
import { BookService } from '@/app/books/services/book.service';
import Link from "next/link";

export interface BookActionsProps {
  book: IBook;
}
export const BookActions = ({book}: BookActionsProps) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<div className={style.bookActions}>
				{/* <button>Update book</button> */}
        <Link href={ `/books/${book.id}/update` }>Update book</Link>
				<button
					className={style.dangerButton}
					onClick={() => setOpenModal(true)}>
					Delete book
				</button>
			</div>
			{openModal && <DeleteBookModal
        title='Delete a Book' 
        book={ book }
        bookService={ new BookService() }
        setOpen={ setOpenModal } />}
		</>
	);
};
