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
    expect(orders[0].itens.length).toBe(5)
    expect(orders[0].id).toBe(order.id)

    await order.load('books')
    const books = order.books.map((book) => ({
      id: book.id,
      titulo: book.titulo,
      autor: book.autor,
      quantidade: book.$extras.pivot_quantidade,
    }))

    expect(orders[0].itens).toEqual(books)
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
      cliente: 'any_cliente',
      books: [
        ...booksToOrder,
        {
          id: 999,
          quantidade: 10,
        },
      ],
    })

    await expect(newOrderPromise).rejects.toThrow(
      new OrderCreateForBooksException([
        {
          bookId: 999,
          error: 'Livro #999 não encontrado',
        },
      ])
    )
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
      cliente: 'any_cliente',
      books: booksToOrder,
    })

    await expect(newOrderPromise).rejects.toThrow(
      new OrderCreateForBooksException([
        {
          bookId: bookBase.id,
          error: `Livro ${bookBase.titulo} fora de stoque`,
        },
      ])
    )
  })

  test('it should create a new order with correct values', async ({ expect }) => {
    const sut = new OrderService()

    const books = await BookFactory.createMany(10)
    const booksToOrder = books.map((book) => ({
      id: book.id,
      quantidade: 5,
      titulo: book.titulo,
    }))
    const newOrder = await sut.create({ cliente: 'any_cliente', books: booksToOrder })
    await newOrder.load('books')

    expect(newOrder).toBeTruthy()
    expect(newOrder.id).toBeTruthy()
    expect(newOrder.status).toBe(OrderStatusEnum.PAID)
    expect(newOrder.cliente).toBe('any_cliente')
    expect(newOrder.books.length).toBe(10)
  })

  test('it should discount quantity correctly on create order', async ({ expect }) => {
    const sut = new OrderService()

    const book = await BookFactory.merge({ estoque: 5 }).create()
    const newOrder = await sut.create({
      cliente: 'any_cliente',
      books: [
        {
          id: book.id,
          quantidade: 2,
        },
      ],
    })
    await newOrder.load('books')

    const bookFromDb = await Book.find(book.id)

    expect(newOrder).toBeTruthy()
    expect(newOrder.id).toBeTruthy()
    expect(newOrder.cliente).toBe('any_cliente')
    expect(newOrder.status).toBe(OrderStatusEnum.PAID)
    expect(newOrder.books.length).toBe(1)
    expect(bookFromDb?.estoque).toBe(3)
  })
})
