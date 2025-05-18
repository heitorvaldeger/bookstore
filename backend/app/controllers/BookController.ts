import type { HttpContext } from '@adonisjs/core/http'

import { BookService } from '#services/BookService'
import { inject } from '@adonisjs/core'
import {
  createBookValidator,
  deleteBookValidator,
  getBookByIdValidator,
  getBooksByFilter,
  updateBookValidator,
} from '#validators/book'

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

  async getBookById({ request, response }: HttpContext) {
    try {
      const payload = await getBookByIdValidator.validate(request.params())
      const book = await this.bookService.getBookById(payload.id)
      return response.status(200).json(book)
    } catch (error) {
      throw error
    }
  }

  async getBooksByFilter({ request, response }: HttpContext) {
    try {
      const payload = await getBooksByFilter.validate(request.qs())
      const books = await this.bookService.getBooksByFilter(payload.q)
      return response.status(200).json(books.map((book) => book.serialize()))
    } catch (error) {
      throw error
    }
  }

  async create({ request, response }: HttpContext) {
    try {
      const payload = await createBookValidator.validate(request.all())
      const book = await this.bookService.create(payload)
      return response.status(200).json(book.serialize())
    } catch (error) {
      throw error
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const { id, ...payload } = await updateBookValidator.validate({
        ...request.params(),
        ...request.all(),
      })
      const book = await this.bookService.update(id, payload)

      return response.status(200).json(book)
    } catch (error) {
      throw error
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const { id } = await deleteBookValidator.validate(request.params())
      const book = await this.bookService.delete(id)

      return response.status(204).json(book)
    } catch (error) {
      throw error
    }
  }
}
