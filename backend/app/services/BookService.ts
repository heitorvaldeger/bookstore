import BookNotFoundException from '#exceptions/BookNotFoundException'
import Book from '#models/book'
import { BookSaveDTO } from '../dtos/BookSaveDTO.js'

export class BookService {
  async getAll() {
    return await Book.all()
  }

  async getBooksByCategory(category: string) {
    return await Book.findManyBy({
      category,
    })
  }

  async create(book: BookSaveDTO) {
    return await Book.create(book)
  }

  async update(bookId: number, book: Partial<BookSaveDTO>) {
    const bookToUpdate = await Book.find(bookId)
    if (!bookToUpdate) {
      throw new BookNotFoundException()
    }

    return await bookToUpdate.merge(book).save()
  }

  async delete(bookId: number) {
    const bookToDelete = await Book.find(bookId)
    if (!bookToDelete) {
      throw new BookNotFoundException()
    }

    await bookToDelete.delete()
  }
}
