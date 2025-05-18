import { Exception } from '@adonisjs/core/exceptions'

export default class BookNotFoundException extends Exception {
  static status = 404
  constructor() {
    super('Book not found', {
      status: 404,
      code: 'E_BOOK_NOT_FOUND',
    })
  }
}
