import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import BookNotFoundException from './BookNotFoundException.js'
import { errors } from '@adonisjs/auth'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {
    if ([BookNotFoundException].some((e) => error instanceof e)) {
      return ctx.response.status(error.status).json({
        code: error.code,
        message: error.message,
      })
    }

    if (
      error instanceof errors.E_UNAUTHORIZED_ACCESS ||
      error instanceof errors.E_INVALID_CREDENTIALS
    ) {
      return ctx.response.status(401).json({
        code: error.code,
        message: error.message,
      })
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
