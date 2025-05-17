import sinon, { stub } from 'sinon'
import { BookFactory } from '#database/factories/BookFactory'
import { BookService } from '#services/BookService'
import { test } from '@japa/runner'
import { BookCategoryEnum } from '../../../app/enums/BookCategoryEnum.js'
import BookNotFoundException from '#exceptions/BookNotFoundException'
import Book from '#models/book'
import app from '@adonisjs/core/services/app'
import { BookSaveDTO } from '../../../app/dtos/BookSaveDTO.js'

const bookToSave = {
  title: 'any_title',
  description: 'any_description',
  author: 'any_author',
  category: BookCategoryEnum.BIBLE,
  price: 999,
  stock: 100,
}

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

  test('it should create a new book', async ({ expect }) => {
    const sut = new BookService()

    const newBook = await sut.create(bookToSave)

    expect(
      newBook.serialize({
        fields: {
          omit: ['id'],
        },
      })
    ).toEqual(bookToSave)
  })

  test("it should return an exception on update if book doesn't exists", async ({ expect }) => {
    stub(Book, 'find').resolves(null)
    const sut = new BookService()

    const promise = sut.update(1, bookToSave)
    expect(promise).rejects.toThrow(new BookNotFoundException())
  })

  test('it should return a book updated on update book', async ({ expect }) => {
    const book = await BookFactory.create()
    const sut = new BookService()

    const bookToUpdate: BookSaveDTO = {
      ...bookToSave,
      description: 'another_description',
    }
    const bookUpdated = await sut.update(book.id, bookToUpdate)

    expect(bookUpdated.description).toBe(bookToUpdate.description)
  })

  test("it should return an exception on delete if book doesn't exists", async ({ expect }) => {
    stub(Book, 'find').resolves(null)
    const sut = new BookService()

    const promise = sut.delete(1)
    expect(promise).rejects.toThrow(new BookNotFoundException())
  })
})
