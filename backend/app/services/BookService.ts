import BookNotFoundException from '#exceptions/BookNotFoundException'
import Book from '#models/book'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { BookSaveDTO } from '../dtos/BookSaveDTO.js'
import { DateTime } from 'luxon'

export class BookService {
  private qSearch: string = ''

  async getAll() {
    return await Book.query().whereNull('deleted_at').orderBy('id').select()
  }

  async getBookById(id: number) {
    const book = await Book.findBy({
      id: id,
      deletedAt: null,
    })
    if (!book) {
      throw new BookNotFoundException()
    }

    return book
  }

  async getBooksByFilter(qSearch: string) {
    this.qSearch = qSearch
    const books = Book.query()
      .where((q) => {
        this.filterByAuthor(q).filterByDescription(q).filterByTitle(q)
      })
      .whereNull('deleted_at')
      .select()

    return books
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

    bookToDelete.deletedAt = DateTime.now()

    await bookToDelete.save()
  }

  private filterByAuthor(query: ModelQueryBuilderContract<typeof Book, Book>) {
    if (this.qSearch) {
      query.orWhereILike('author', `%${this.qSearch}%`)
    }

    return this
  }

  private filterByDescription(query: ModelQueryBuilderContract<typeof Book, Book>) {
    if (this.qSearch) {
      query.orWhereILike('description', `%${this.qSearch}%`)
    }

    return this
  }

  private filterByTitle(query: ModelQueryBuilderContract<typeof Book, Book>) {
    if (this.qSearch) {
      query.orWhereILike('title', `%${this.qSearch}%`)
    }

    return this
  }
}
