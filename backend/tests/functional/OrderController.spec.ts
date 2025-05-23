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
    const orderWithFieldsInvalid = client.post('/api/orders').json({
      books: [
        {
          id: 'any_value',
          quantidade: -1,
        },
      ],
    })

    const orderWithoutBooks = client.post('/api/orders').json({})

    const [responseOrderWithFieldsInvalid, responseOrderWithoutBooks] = await Promise.all([
      orderWithFieldsInvalid,
      orderWithoutBooks,
    ])

    expect(responseOrderWithFieldsInvalid.status()).toBe(422)
    expect(responseOrderWithFieldsInvalid.body()).toEqual({
      errors: [
        {
          field: 'cliente',
          message: 'The cliente field must be defined',
          rule: 'required',
        },
        {
          message: 'The id field must be a number',
          rule: 'number',
          field: 'books.0.id',
        },
        {
          message: 'The quantidade field must be positive',
          rule: 'positive',
          field: 'books.0.quantidade',
        },
      ],
    })

    expect(responseOrderWithoutBooks.status()).toBe(422)
    expect(responseOrderWithoutBooks.body()).toEqual({
      errors: [
        {
          field: 'cliente',
          message: 'The cliente field must be defined',
          rule: 'required',
        },
        {
          field: 'books',
          message: 'The books field must be defined',
          rule: 'required',
        },
      ],
    })
  })

  test('/POST - return 422 if books list is empty on order', async ({ client, expect }) => {
    const response = await client.post('/api/orders').json({
      cliente: 'any_cliente',
      books: [],
    })

    expect(response.status()).toBe(422)
    expect(response.body()).toEqual({
      errors: [
        {
          message: 'The books field must not be empty',
          rule: 'notEmpty',
          field: 'books',
        },
      ],
    })
  })

  test('/POST - return 201 with creation a book on success', async ({ client, expect }) => {
    const booksPayload = books.map((book) => ({
      id: book.id,
      titulo: book.titulo,
      quantidade: 2,
    }))

    const response = await client.post('/api/orders').json({
      cliente: 'any_customer',
      books: booksPayload,
    })

    expect(response.status()).toBe(201)
    expect(response.body().status).toBe(OrderStatusEnum.PAID)
  })

  test("/POST - return some error with 400 if any book doesn't exist", async ({
    client,
    expect,
  }) => {
    const booksPayload = books.map((book) => ({
      id: book.id,
      quantidade: 2,
    }))

    const response = await client.post('/api/orders').json({
      cliente: 'any_customer',
      books: [
        ...booksPayload,
        {
          id: 999,
          quantidade: 3,
        },
      ],
    })

    const exception = new OrderCreateForBooksException([
      { bookId: 999, error: 'Livro #999 não encontrado' },
    ])
    expect(response.status()).toBe(400)
    expect(response.body()).toEqual({
      message: exception.message,
      code: exception.code,
      errors: exception.errors,
    })
  })

  test('/POST - return some error with 400 if book estoque is not avaiable', async ({
    client,
    expect,
  }) => {
    const booksPayload = books.map((book) => ({
      id: book.id,
      quantidade: 2,
    }))

    booksPayload[0].quantidade = 2000

    const baseBook = booksPayload[0]

    const response = await client.post('/api/orders').json({
      cliente: 'any_customer',
      books: booksPayload,
    })

    const exception = new OrderCreateForBooksException([
      {
        bookId: baseBook.id,
        error: `Livro ${books[0].titulo} fora de estoque`,
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
    const response = await client.get('/api/orders')

    const body = response.body()
    expect(response.status()).toBe(200)
    expect(body.length).toBe(1)
    expect(body[0].itens.length).toBe(5)
  })
})
