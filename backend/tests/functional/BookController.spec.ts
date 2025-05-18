import { BookFactory } from '#database/factories/BookFactory'
import Book from '#models/book'
import { test } from '@japa/runner'

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
})
