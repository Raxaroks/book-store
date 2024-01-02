'use client'
import * as Yup from 'yup';
import { FormControl, FormikErrors } from '@/types';
import style from './book-form.module.css';
import { IBook } from '@/types/models/book.interface';
import { useFormik } from 'formik';
import { BookService } from '@/app/books/services/book.service';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


export interface BookFormProps {
  title: string,
  mode: 'create' | 'update',
  initialValues?: IBook
}

const INIT_STATE: IBook = {
  id: '',
  name: '',
  isbn: '',
  author: '',
  publisher: '',
  publication: 0,
  language: '',
  price: 0,
  stock: 0,
  topics: [],
  img: ''
}; 

export const BookForm = ({title, mode, initialValues = INIT_STATE}: BookFormProps) => {
  const router = useRouter();
  const bookService = new BookService();
  const fc: FormControl<IBook> = {
    initialValues,
    validationSchema: Yup.object({
      id: Yup.string(),
      name: Yup.string().required(FormikErrors.Required),
      isbn: Yup.string().required(FormikErrors.Required),
      author: Yup.string().required(FormikErrors.Required),
      publisher: Yup.string().required(FormikErrors.Required),
      publication: Yup.number().required(FormikErrors.Required).min(1, FormikErrors.Year),
      language: Yup.string().required(FormikErrors.Required),
      price: Yup.number(),
      stock: Yup.number(),
      topics: Yup.array(),
      img: Yup.string().url(FormikErrors.Url),
    }),
    onSubmit: async ({ id, ...body }) => {
      const promise = (mode === 'create') ? bookService.create(body) : bookService.update(id!, body)
      await toast.promise(
        promise, {
          pending: 'Executing',
          success: (mode === 'create') ? 'Book created' : 'Book updated',
          error: 'Something went wrong while trying to connect to the server...'
        }
      );

      if (mode === 'create') {
        router.push('/books')
        router.refresh()
      } else {
        router.push(`/books/${id}`)
        router.refresh()
      }
    }
  };

  const { getFieldProps, touched, errors, handleSubmit, handleReset } = useFormik<IBook>(fc);

  return (
    <form className={ style.bookForm } onSubmit={ handleSubmit } noValidate>
      <h2>{ title }</h2>
      <label htmlFor="name">First Name</label>
      <input className={ 
        touched.name && errors.name 
          ? `${style.bookFormInput} ${style.inputError}` : `${style.bookFormInput}` 
      } 
      type="text"
      { ...getFieldProps('name') } name="name" placeholder="Book's name" />
      { touched.name && errors.name && <span className={ style.formError }>{ errors.name }</span> }

      <label htmlFor="isbn">ISBN</label>
      <input className={ touched.isbn && errors.isbn 
          ? `${style.bookFormInput} ${style.inputError}` : `${style.bookFormInput}` } type="text"
      { ...getFieldProps('isbn') } name="isbn" placeholder="ISBN" />
      { touched.isbn && errors.isbn && <span className={ style.formError }>{ errors.isbn }</span> }
      
      <label htmlFor="author">Author</label>
      <input className={ touched.author && errors.author 
          ? `${style.bookFormInput} ${style.inputError}` : `${style.bookFormInput}`  } type="text" 
      { ...getFieldProps('author') } name="author" placeholder="Book's author" />
      { touched.author && errors.author && <span className={ style.formError }>{ errors.author }</span> }

      <label htmlFor="publisher">Publisher</label>
      <input className={ touched.publisher && errors.publisher 
          ? `${style.bookFormInput} ${style.inputError}` : `${style.bookFormInput}`  } type="text"
      { ...getFieldProps('publisher') } name="publisher" placeholder="Publisher" />
      { touched.publisher && errors.publisher && <span className={ style.formError }>{ errors.publisher }</span> }

      <label htmlFor="publication">Year of publication</label>
      <input className={ touched.publication && errors.publication 
          ? `${style.bookFormInput} ${style.inputError}` : `${style.bookFormInput}`  } type="number"
      { ...getFieldProps('publication') } name="publication" placeholder="Year" />
      { touched.publication && errors.publication && <span className={ style.formError }>{ errors.publication }</span> }

      <label htmlFor="language">Language</label>
      <input className={ touched.language && errors.language 
          ? `${style.bookFormInput} ${style.inputError}` : `${style.bookFormInput}`  } type="text"
      { ...getFieldProps('langugage') } name="language" placeholder="Book's language" />
      { touched.language && errors.language && <span className={ style.formError }>{ errors.language }</span> }

      <label htmlFor="img">Image URL</label>
      <input className={ touched.img && errors.img 
          ? `${style.bookFormInput} ${style.inputError}` : `${style.bookFormInput}` } type="text"
      { ...getFieldProps('img') } name="img" placeholder="Book's image" />
      { touched.img && errors.img && <span className={ style.formError }>{ errors.img }</span> }

      <label htmlFor="price">Price</label>
      <input className={ `${style.bookFormInput}` } type="number"
      { ...getFieldProps('price') } name="price" placeholder="Estimated price" />

      <label htmlFor="stock">Stock</label>
      <input className={ style.bookFormInput } type="number"
      { ...getFieldProps('stock') } name="stock" placeholder="Stock" />

      <button 
        className={ style.bookFormButton } 
        type='submit'>Submit</button>
      <button 
        className={ `${ style.bookFormButton } ${ style.bookFormButtonReset }` } 
        type='button'
        onClick={ () => handleReset(INIT_STATE) }>Reset form</button>
    </form>
  )
}
