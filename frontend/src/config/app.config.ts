
export default function AppConfig() {
  return {
    environment: process.env.NODE_ENV || 'dev',
    app: {
      hostUrl: process.env.SPA_HOST_URI || ''
    },
    api: {
      books: process.env.NEXT_PUBLIC_BOOKS_API_URI || ''
    }
  }
}
