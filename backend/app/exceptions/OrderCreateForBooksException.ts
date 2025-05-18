import { Exception } from '@adonisjs/core/exceptions'

export default class OrderCreateForBooksException extends Exception {
  errors: any[] = []

  static status = 400
  constructor(errors: any) {
    super("Order couldn't be processed", {
      status: 400,
      code: 'E_ORDER_COULDNT_BE_PROCESSED',
    })
    this.errors = errors
  }
}
