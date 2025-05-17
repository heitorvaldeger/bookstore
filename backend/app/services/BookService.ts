import Book from '#models/book'

export class BookService {
  async getAll() {
    return await Book.all()
  }

  async getBooksByCategory(category: string) {
    return await Book.findManyBy({
      category,
    })
  }
}
