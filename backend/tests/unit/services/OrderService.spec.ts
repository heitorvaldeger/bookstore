import { OrderFactory } from '#database/factories/OrderFactory'
import Order from '#models/order'
import { OrderService } from '#services/OrderService'
import { test } from '@japa/runner'
import { randomInt } from 'node:crypto'

test.group('Services order service', (t) => {
  let order: Order
  t.setup(async () => {
    const quantity = randomInt(5, 20)
    order = await OrderFactory.with('books', 5, (book) => {
      book.pivotAttributes({
        quantity,
      })
    }).create()
  })

  test('it should return all orders in database', async ({ expect }) => {
    const sut = new OrderService()
    const orders = await sut.getAll()

    expect(orders.length).toBe(1)
    expect(orders[0].items.length).toBe(5)
    expect(orders[0].id).toBe(order.id)

    await order.load('books')
    const books = order.books.map((book) => ({
      id: book.id,
      title: book.title,
      quantity: book.$extras.pivot_quantity,
    }))

    expect(orders[0].items).toEqual(books)
  })
})
