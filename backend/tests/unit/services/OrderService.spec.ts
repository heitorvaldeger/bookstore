import { BookFactory } from '#database/factories/BookFactory'
import { OrderFactory } from '#database/factories/OrderFactory'
import Order from '#models/order'
import { OrderService } from '#services/OrderService'
import { test } from '@japa/runner'
import { randomInt } from 'node:crypto'
import { OrderStatusEnum } from '../../../app/enums/OrderStatusEnum.js'
import OrderCreateForBooksException from '#exceptions/OrderCreateForBooksException'
import db from '@adonisjs/lucid/services/db'
import Book from '#models/book'

test.group('Services order service', (t) => {
  let order: Order
  t.setup(async () => {
    const trx = await db.beginGlobalTransaction()
    const quantidade = randomInt(5, 20)
    order = await OrderFactory.with('books', 5, (book) => {
      book.pivotAttributes({
        quantidade,
      })
    }).create()
    return () => trx.rollback()
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
      titulo: book.titulo,
      quantidade: book.$extras.pivot_quantity,
    }))

    expect(orders[0].items).toEqual(books)
  })

  test("it should return errors if any book doesn't exists", async ({ expect }) => {
    const sut = new OrderService()

    const books = await BookFactory.createMany(2)
    const booksToOrder = books.map((book) => ({
      id: book.id,
      quantidade: 5,
      titulo: book.titulo,
    }))
    const newOrderPromise = sut.create({
      books: [
        ...booksToOrder,
        {
          id: 999,
          quantidade: 10,
          titulo: 'any_title',
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

  test("it should return errors if any book doesn't estoque avaiable", async ({ expect }) => {
    const sut = new OrderService()

    const books = await BookFactory.createMany(2)
    const booksToOrder = books.map((book) => ({
      id: book.id,
      quantidade: 5,
      titulo: book.titulo,
    }))
    booksToOrder[0].quantidade = 300
    const bookBase = booksToOrder[0]

    const newOrderPromise = sut.create({
      books: booksToOrder,
    })

    expect(newOrderPromise).rejects.toThrow(new OrderCreateForBooksException([]))
    expect(newOrderPromise).rejects.toMatchObject({
      errors: [
        {
          bookId: bookBase.id,
          bookTitle: bookBase.titulo,
          error: `Book ${bookBase.titulo} out of estoque`,
        },
      ],
    })
  })

  test('it should create a new order with correct values', async ({ expect }) => {
    const sut = new OrderService()

    const books = await BookFactory.createMany(10)
    const booksToOrder = books.map((book) => ({
      id: book.id,
      quantidade: 5,
      titulo: book.titulo,
    }))
    const newOrder = await sut.create({ books: booksToOrder })
    await newOrder.load('books')

    expect(newOrder).toBeTruthy()
    expect(newOrder.id).toBeTruthy()
    expect(newOrder.status).toBe(OrderStatusEnum.PENDING)
    expect(newOrder.books.length).toBe(10)
  })

  test('it should discount quantidade correctly on create order', async ({ expect }) => {
    const sut = new OrderService()

    const book = await BookFactory.merge({ estoque: 5 }).create()
    const newOrder = await sut.create({
      books: [
        {
          id: book.id,
          quantidade: 2,
          titulo: book.titulo,
        },
      ],
    })
    await newOrder.load('books')

    const bookFromDb = await Book.find(book.id)

    expect(newOrder).toBeTruthy()
    expect(newOrder.id).toBeTruthy()
    expect(newOrder.status).toBe(OrderStatusEnum.PENDING)
    expect(newOrder.books.length).toBe(1)
    expect(bookFromDb?.estoque).toBe(3)
  })
})
