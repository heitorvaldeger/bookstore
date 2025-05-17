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

  test('it should return books in database by category', async ({ expect }) => {
    const sut = new BookService()
    const booksScience = await sut.getBooksByCategory('science')
    expect(booksScience.length).toBe(10)

    const booksBible = await sut.getBooksByCategory('bible')
    expect(booksBible.length).toBe(0)

    BookFactory.merge({ category: 'others' }).createMany(5)

    const booksOthers = await sut.getBooksByCategory('others')
    expect(booksOthers.length).toBe(5)
  })
})
