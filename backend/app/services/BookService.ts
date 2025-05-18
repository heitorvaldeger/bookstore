import BookNotFoundException from '#exceptions/BookNotFoundException'
import Book from '#models/book'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { BookSaveDTO } from '../dtos/BookSaveDTO.js'

export class BookService {
  private qSearch: string = ''

  async getAll() {
    return await Book.query().orderBy('id').select()
  }

  async getBooksByCategory(category: string) {
    return await Book.findManyBy({
      category,
    })
  }

  async getBooksByFilter(qSearch: string) {
    const qBook = Book.query()
    this.qSearch = qSearch
    const books = await this.filterByAuthor(qBook)
      .filterByDescription(qBook)
      .filterByTitle(qBook)
      .getQuery(qBook)
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

    await bookToDelete.delete()
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

  private getQuery(query: ModelQueryBuilderContract<typeof Book, Book>) {
    return query
  }
}
