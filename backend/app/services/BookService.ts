import Book from '#models/book'

export class BookService {
  async getAll() {
    return await Book.all()
  }
}
