import { BookFactory } from '#database/factories/BookFactory'
import { BookService } from '#services/BookService'
import { test } from '@japa/runner'
import { BookCategoryEnum } from '../../../app/enums/BookCategoryEnum.js'

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
    const booksScience = await sut.getBooksByCategory(BookCategoryEnum.SCIENCE)
    expect(booksScience.length).toBe(10)

    const booksBible = await sut.getBooksByCategory(BookCategoryEnum.BIBLE)
    expect(booksBible.length).toBe(0)

    BookFactory.merge({ category: BookCategoryEnum.OTHERS }).createMany(5)

    const booksOthers = await sut.getBooksByCategory(BookCategoryEnum.OTHERS)
    expect(booksOthers.length).toBe(5)
  })
})
