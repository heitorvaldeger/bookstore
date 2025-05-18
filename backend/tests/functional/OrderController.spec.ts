import { BookFactory } from '#database/factories/BookFactory'
import Book from '#models/book'
import { test } from '@japa/runner'
import { OrderStatusEnum } from '../../app/enums/OrderStatusEnum.js'

test.group('Order Controller', (group) => {
  let booksFactory: Book[] = []

  group.each.setup(async () => {
    booksFactory = await BookFactory.createMany(10)
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
    const booksPayload = booksFactory.map((book) => ({
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
})
