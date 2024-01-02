import { BookForm } from '@/app/components/BookForm/BookForm'

const createBookPage = () => {
  return (
    <BookForm mode='create' title='Create a new book' />
  )
}

export default createBookPage