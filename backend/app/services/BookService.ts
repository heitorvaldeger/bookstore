import BookNotFoundException from '#exceptions/BookNotFoundException'
import Book from '#models/book'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { BookFilterDTO } from '../dtos/BookFilterDTO.js'
import { BookSaveDTO } from '../dtos/BookSaveDTO.js'

export class BookService {
  private filters: BookFilterDTO = {}

  async getAll() {
    return await Book.query().orderBy('id').select()
  }

  async getBooksByCategory(category: string) {
    return await Book.findManyBy({
      category,
    })
  }

  async getBooksByFilter(filters: BookFilterDTO) {
    const qBook = Book.query()
    this.filters = filters
    const books = await this.filterByAuthor(qBook)
      .filterByDescription(qBook)
      .filterByTitle(qBook)
      .filter(qBook)
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
    if (this.filters.author) {
      query.whereILike('author', `%${this.filters.author}%`)
    }

    return this
  }

  private filterByDescription(query: ModelQueryBuilderContract<typeof Book, Book>) {
    if (this.filters.description) {
      query.whereILike('description', `%${this.filters.description}%`)
    }

    return this
  }

  private filterByTitle(query: ModelQueryBuilderContract<typeof Book, Book>) {
    if (this.filters.title) {
      query.whereILike('title', `%${this.filters.title}%`)
    }

    return this
  }

  private filter(query: ModelQueryBuilderContract<typeof Book, Book>) {
    return query
  }
}
