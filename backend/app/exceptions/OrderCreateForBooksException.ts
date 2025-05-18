import { Exception } from '@adonisjs/core/exceptions'

export default class OrderCreateForBooksException extends Exception {
  errors: any[] = []
  static status = 400
  static message?: string | undefined = ''

  constructor(errors: any) {
    super()
    this.errors = errors
  }
}
