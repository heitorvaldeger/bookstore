import factory from '@adonisjs/lucid/factories'
import Order from '#models/order'
import { BookFactory } from './BookFactory.js'
import { OrderStatusEnum } from '../../app/enums/OrderStatusEnum.js'

export const OrderFactory = factory
  .define(Order, async () => {
    return {
      status: OrderStatusEnum.PENDING,
    }
  })
  .relation('books', () => BookFactory)
  .build()
