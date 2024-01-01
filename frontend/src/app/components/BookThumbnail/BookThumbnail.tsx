import { IBook } from '@/types/models/book.interface';
import NoImg from '../../../../public/images/no-picture.png'
import style from './book-thumbnail.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { toTitleCase } from '@/helpers';


export interface BookThumbnailProps {
  book: IBook
}
export const BookThumbnail = ({ book }: BookThumbnailProps) => {
  const { img, id, name, author } = book;

  return (
    <Link href={`/books/${id}`} className={style.bookThumbnail}>
      <Image className={ style.thumbnailImage } src={ img || NoImg } alt={ `Book ID: ${id}` }
      width={0} height={0} sizes='100vh' />

      <span className={ style.thumbnailHeading }>
        <h3>{ toTitleCase(name) }</h3>
        <small>by { author }</small>
      </span>
    </Link>
  )
}
