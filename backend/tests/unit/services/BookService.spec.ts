import { BookFactory } from '#database/factories/BookFactory'
import { BookService } from '#services/BookService'
import { test } from '@japa/runner'

test.group('Services book service', (t) => {
  t.setup(async () => {
    await BookFactory.createMany(10)
  })

  test('it should return all books in database', async ({ expect }) => {
    const sut = new BookService()
    const books = await sut.getAll()

    expect(books.length).toBe(10)
  })
})
