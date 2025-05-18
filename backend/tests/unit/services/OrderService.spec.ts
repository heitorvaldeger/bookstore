import { BookFactory } from '#database/factories/BookFactory'
import { OrderFactory } from '#database/factories/OrderFactory'
import Order from '#models/order'
import { OrderService } from '#services/OrderService'
import { test } from '@japa/runner'
import { randomInt } from 'node:crypto'
import { OrderStatusEnum } from '../../../app/enums/OrderStatusEnum.js'
import OrderCreateForBooksException from '#exceptions/OrderCreateForBooksException'

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

  test("it should return errors if any book doesn't exists", async ({ expect }) => {
    const sut = new OrderService()

    const books = await BookFactory.createMany(2)
    const booksToOrder = books.map((book) => ({
      id: book.id,
      quantity: 5,
      title: book.title,
    }))
    const newOrderPromise = sut.create({
      books: [
        ...booksToOrder,
        {
          id: 999,
          quantity: 10,
          title: 'any_title',
        },
      ],
    })

    expect(newOrderPromise).rejects.toThrow(new OrderCreateForBooksException([]))
    expect(newOrderPromise).rejects.toMatchObject({
      errors: [
        {
          bookId: 999,
          bookTitle: 'any_title',
          error: 'Book any_title not found',
        },
      ],
    })
  })

  test("it should return errors if any book doesn't stock avaiable", async ({ expect }) => {
    const sut = new OrderService()

    const books = await BookFactory.createMany(2)
    const booksToOrder = books.map((book) => ({
      id: book.id,
      quantity: 5,
      title: book.title,
    }))
    booksToOrder[0].quantity = 300
    const bookBase = booksToOrder[0]

    const newOrderPromise = sut.create({
      books: booksToOrder,
    })

    expect(newOrderPromise).rejects.toThrow(new OrderCreateForBooksException([]))
    expect(newOrderPromise).rejects.toMatchObject({
      errors: [
        {
          bookId: bookBase.id,
          bookTitle: bookBase.title,
          error: `Book ${bookBase.title} out of stock`,
        },
      ],
    })
  })

  test('it should create a new order with correct values', async ({ expect }) => {
    const sut = new OrderService()

    const books = await BookFactory.createMany(10)
    const booksToOrder = books.map((book) => ({
      id: book.id,
      quantity: 5,
      title: book.title,
    }))
    const newOrder = await sut.create({ books: booksToOrder })
    await newOrder.load('books')

    expect(newOrder).toBeTruthy()
    expect(newOrder.id).toBeTruthy()
    expect(newOrder.status).toBe(OrderStatusEnum.PENDING)
    expect(newOrder.books.length).toBe(10)
  })
})
