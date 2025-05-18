import type { HttpContext } from '@adonisjs/core/http'

import { BookService } from '#services/BookService'
import { inject } from '@adonisjs/core'
import { createOrUpdateBookValidator, getBooksByCategoryValidator } from '#validators/book'

@inject()
export default class BookController {
  constructor(private readonly bookService: BookService) {}

  async getAll({ response }: HttpContext) {
    try {
      const books = await this.bookService.getAll()
      return response.status(200).json(books.map((book) => book.serialize()))
    } catch (error) {
      throw error
    }
  }

  async getBooksByCategory({ request, response }: HttpContext) {
    try {
      const payload = await getBooksByCategoryValidator.validate(request.all())
      const books = await this.bookService.getBooksByCategory(payload.category)
      return response.status(200).json(books.map((book) => book.serialize()))
    } catch (error) {
      throw error
    }
  }

  async create({ request, response }: HttpContext) {
    try {
      const payload = await createOrUpdateBookValidator.validate(request.all())
      const book = await this.bookService.create(payload)
      return response.status(200).json(book.serialize())
    } catch (error) {
      throw error
    }
  }
}
