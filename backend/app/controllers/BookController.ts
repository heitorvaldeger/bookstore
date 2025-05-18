import type { HttpContext } from '@adonisjs/core/http'

import { BookService } from '#services/BookService'
import { inject } from '@adonisjs/core'

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
}
