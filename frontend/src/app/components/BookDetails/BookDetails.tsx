import { BookService } from '@/app/books/services/book.service';
import { toTitleCase } from '@/helpers';
import Image from 'next/image';
import NoImg from '../../../../public/images/no-picture.png';
import style from './book-details.module.css';
import { IBook } from '@/types/models/book.interface';
import { BookActions } from '../BookActions/BookActions';

export interface BookDetailsProps {
	id: string;
	service: BookService;
}

export const BookDetails = async ({ id, service }: BookDetailsProps) => {
	const book = await service.findOne(id);

	return (
		<>
			<BookActions book={ book } />
			<div className={style.bookContainer}>
				<Image
					className={style.bookImg}
					src={book.img || NoImg}
					alt={book.name}
					width={0}
					height={0}
					sizes='100vh'
					priority={true}
				/>

				<div className={style.bookDetails}>
					<h3>{toTitleCase(book.name)}</h3>
					<ul>
						<li>
							<span>
								<strong>Author:</strong> {book.author}
							</span>
						</li>
						<li>
							<span>
								<strong>ISBN:</strong> {book.isbn}
							</span>
						</li>
						<li>
							<span>
								<strong>Publisher:</strong> {book.publisher}
							</span>
						</li>
						<li>
							<span>
								<strong>Publication:</strong> {book.publication}
							</span>
						</li>
						<li>
							<span>
								<strong>Language:</strong>{' '}
								{toTitleCase(book.language)}
							</span>
						</li>
						{book.price > 0 && (
							<li>
								<span>
									<strong>Price:</strong> {book.price}
								</span>
							</li>
						)}
						{book.stock > 0 && (
							<li>
								<span>
									<strong>Stock:</strong> {book.stock}
								</span>
							</li>
						)}
					</ul>
				</div>
			</div>
		</>
	);
};
