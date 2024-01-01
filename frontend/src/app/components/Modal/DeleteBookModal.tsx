import { IBook } from '@/types/models/book.interface';
import { Modal, ModalProps } from "./Modal";
import { toTitleCase } from '@/helpers';
import style from './modal.module.css';
import { BookService } from '@/app/books/services/book.service';
import { useRouter } from 'next/navigation';


export interface DeleteBookModalProps extends ModalProps { 
  bookService: BookService;
  book: IBook;
}

export const DeleteBookModal = ( { title, setOpen, book, bookService}: DeleteBookModalProps) => {
  const router = useRouter();
  const deleteBook = async () => {
    const { id } = book;
    await bookService.delete(id!);
    router.push('/books')
    router.refresh()
    setOpen(false);
  }

  return (
    <Modal title={ title } setOpen={ setOpen }>
      <div className={ style.modalChildren }>
        <p>Are you sure that you want to delete this book?</p>
        <ul>
          <li><strong>Name:</strong> {toTitleCase(book.name)}</li>  
          <li><strong>Author:</strong> {book.author}</li>  
        </ul>  
        <p>If you confirm, You will be redirected to the Book List Page afther the operation executes.</p>

        <div className={ style.modalActions }>
          <button className={ style.dangerButton }
            onClick={ deleteBook } >Yes, confirm and delete</button>
          <button onClick={ () => setOpen(false) }>Cancel</button>
        </div>
      </div>  
    </Modal>
  )
}

