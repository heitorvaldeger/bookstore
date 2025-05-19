import { OrderService } from '#services/OrderService'
import { createOrderValidator } from '#validators/order'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrderController {
  constructor(private readonly orderService: OrderService) {}

  async create({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createOrderValidator)
      const order = await this.orderService.create(payload)

      return response.status(201).json(order)
    } catch (error) {
      throw error
    }
  }

  async getAll({ response }: HttpContext) {
    try {
      const orders = await this.orderService.getAll()

      return response.status(200).json(orders)
    } catch (error) {
      throw error
    }
  }
}
