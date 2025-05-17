import { Exception } from '@adonisjs/core/exceptions'

export default class BookNotFoundException extends Exception {
  static status = 404
  static message?: string | undefined = 'Book not found'
}
