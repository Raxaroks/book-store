import { Suspense } from 'react'
import Loading from './loading'

export default function UpdateBookLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense
      fallback={ <Loading /> }>
      { children }
    </Suspense>
  )
}