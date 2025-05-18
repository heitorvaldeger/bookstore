import { BookFactory } from '#database/factories/BookFactory'
import Book from '#models/book'
import { test } from '@japa/runner'
import { BookCategoryEnum } from '../../app/enums/BookCategoryEnum.js'

test.group('Book Controller', (group) => {
  let booksFactory: Book[] = []

  group.each.setup(async () => {
    booksFactory = await BookFactory.createMany(10)
  })
  test('/GET - return 200 with all books in database', async ({ client, expect }) => {
    const response = await client.get('/books')

    expect(response.status()).toBe(200)
    expect(response.body()).toEqual(booksFactory.map((book) => book.serialize()))
  })

  test('/GET - return 200 with books list if filter by category passed', async ({
    client,
    expect,
  }) => {
    await BookFactory.merge({
      category: BookCategoryEnum.OTHERS,
    }).createMany(3)
    const response = await client.get('/books/filter').qs({
      category: BookCategoryEnum.OTHERS,
    })

    const books = response.body()

    expect(response.status()).toBe(200)
    expect(books.length).toBe(3)
  })

  test('/GET - return 422 get books by category filter if field is not provided', async ({
    client,
    expect,
  }) => {
    const response = await client.get('/books/filter')

    const body = response.body()

    expect(response.status()).toBe(422)
    expect(body).toEqual({
      errors: [
        {
          message: 'The category field must be defined',
          rule: 'required',
          field: 'category',
        },
      ],
    })
  })

  test('/GET - return 422 get books by category filter if field is invalid', async ({
    client,
    expect,
  }) => {
    const response = await client.get('/books/filter').qs({
      category: 'any_value',
    })

    const body = response.body()

    expect(response.status()).toBe(422)
    expect(body).toEqual({
      errors: [
        {
          message: 'The selected category is invalid',
          rule: 'enum',
          field: 'category',
          meta: {
            choices: Object.values(BookCategoryEnum),
          },
        },
      ],
    })
  })
})
