import { BookService } from '#services/BookService'
import { OrderService } from '#services/OrderService'
import type { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {
    this.app.container.bind(BookService, async () => {
      return this.app.container.make(BookService)
    })

    this.app.container.bind(OrderService, async () => {
      return this.app.container.make(OrderService)
    })
  }

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
