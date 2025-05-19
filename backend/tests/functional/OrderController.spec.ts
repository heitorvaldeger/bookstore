import { BookFactory } from '#database/factories/BookFactory'
import Book from '#models/book'
import { test } from '@japa/runner'
import { OrderStatusEnum } from '../../app/enums/OrderStatusEnum.js'
import OrderCreateForBooksException from '#exceptions/OrderCreateForBooksException'
import db from '@adonisjs/lucid/services/db'
import { OrderFactory } from '#database/factories/OrderFactory'

test.group('Order Controller', (group) => {
  let books: Book[] = []

  group.each.setup(async () => {
    const trx = await db.beginGlobalTransaction()
    await OrderFactory.with('books', 5).create()
    books = await BookFactory.query({
      client: trx,
    }).createMany(10)

    return () => trx.rollback()
  })

  test('/POST - return 422 if any field in payload is invalid on create', async ({
    client,
    expect,
  }) => {
    const orderWithFieldsInvalid = client.post('/orders').json({
      books: [
        {
          id: 'any_value',
          title: '',
          quantity: -1,
        },
      ],
    })

    const orderWithoutBooks = client.post('/orders').json({})

    const [responseOrderWithFieldsInvalid, responseOrderWithoutBooks] = await Promise.all([
      orderWithFieldsInvalid,
      orderWithoutBooks,
    ])

    expect(responseOrderWithFieldsInvalid.status()).toBe(422)
    expect(responseOrderWithFieldsInvalid.body()).toEqual({
      errors: [
        {
          message: 'The id field must be a number',
          rule: 'number',
          field: 'books.0.id',
        },
        {
          message: 'The title field must be defined',
          rule: 'required',
          field: 'books.0.title',
        },
        {
          message: 'The quantity field must be positive',
          rule: 'positive',
          field: 'books.0.quantity',
        },
      ],
    })

    expect(responseOrderWithoutBooks.status()).toBe(422)
    expect(responseOrderWithoutBooks.body()).toEqual({
      errors: [
        {
          field: 'books',
          message: 'The books field must be defined',
          rule: 'required',
        },
      ],
    })
  })

  test('/POST - return 201 with creation a book on success', async ({ client, expect }) => {
    const booksPayload = books.map((book) => ({
      id: book.id,
      title: book.title,
      quantity: 2,
    }))

    const response = await client.post('/orders').json({
      books: booksPayload,
    })

    expect(response.status()).toBe(201)
    expect(response.body().status).toBe(OrderStatusEnum.PENDING)
  })

  test("/POST - return some error with 400 if any book doesn't exist", async ({
    client,
    expect,
  }) => {
    const booksPayload = books.map((book) => ({
      id: book.id,
      title: book.title,
      quantity: 2,
    }))

    const response = await client.post('/orders').json({
      books: [
        ...booksPayload,
        {
          id: 999,
          title: 'any_title',
          quantity: 3,
        },
      ],
    })

    const exception = new OrderCreateForBooksException([
      { bookId: 999, bookTitle: 'any_title', error: 'Book any_title not found' },
    ])
    expect(response.status()).toBe(400)
    expect(response.body()).toEqual({
      message: exception.message,
      code: exception.code,
      errors: exception.errors,
    })
  })

  test('/POST - return some error with 400 if book stock is not avaiable', async ({
    client,
    expect,
  }) => {
    const booksPayload = books.map((book) => ({
      id: book.id,
      title: book.title,
      quantity: 2,
    }))

    booksPayload[0].quantity = 2000

    const baseBook = booksPayload[0]

    const response = await client.post('/orders').json({
      books: booksPayload,
    })

    const exception = new OrderCreateForBooksException([
      {
        bookId: baseBook.id,
        bookTitle: baseBook.title,
        error: `Book ${baseBook.title} out of stock`,
      },
    ])
    expect(response.status()).toBe(400)
    expect(response.body()).toEqual({
      message: exception.message,
      code: exception.code,
      errors: exception.errors,
    })
  })

  test('/GET - return a list of orders with success', async ({ client, expect }) => {
    const response = await client.get('/orders')

    const body = response.body()
    expect(response.status()).toBe(200)
    expect(body.length).toBe(1)
    expect(body[0].items.length).toBe(5)
  })
})
