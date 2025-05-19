import { stub } from 'sinon'
import { BookFactory } from '#database/factories/BookFactory'
import { BookService } from '#services/BookService'
import { test } from '@japa/runner'
import { BookCategoryEnum } from '../../../app/enums/BookCategoryEnum.js'
import BookNotFoundException from '#exceptions/BookNotFoundException'
import Book from '#models/book'
import { BookSaveDTO } from '../../../app/dtos/BookSaveDTO.js'
import { DateTime } from 'luxon'

const bookToSave = {
  title: 'any_title',
  description: 'any_description',
  author: 'any_author',
  imageURL: 'any_image',
  category: BookCategoryEnum.BIBLE,
  price: 999,
  stock: 100,
}

test.group('Services book service', () => {
  test('it should return all books in database', async ({ expect }) => {
    await BookFactory.createMany(5)
    const sut = new BookService()
    const books = await sut.getAll()

    expect(books.length).toBe(5)
  })

  test('it should return a book in database by id', async ({ expect }) => {
    const booksFactory = await BookFactory.createMany(5)
    const sut = new BookService()
    const book = await sut.getBookById(booksFactory[0].id)
    expect(book?.serialize()).toEqual(booksFactory[0].serialize())
  })

  test("it should return an exception if book doesn't exists", async ({ expect }) => {
    const sut = new BookService()
    const getBookByIdPromise = sut.getBookById(-1)
    expect(getBookByIdPromise).rejects.toThrow(new BookNotFoundException())
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

  test("it should return an exception on update if book doesn't exists on find", async ({
    expect,
  }) => {
    stub(Book, 'find').resolves(null)
    const sut = new BookService()

    const updatePromise = sut.update(1, bookToSave)
    expect(updatePromise).rejects.toThrow(new BookNotFoundException())
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

    const deletePromise = sut.delete(1)
    expect(deletePromise).rejects.toThrow(new BookNotFoundException())
  })

  test('it should delete a book with success', async ({ expect }) => {
    const book = await BookFactory.create()
    const sut = new BookService()
    await sut.delete(book.id)

    const bookDeleted = await Book.find(book.id)
    expect(bookDeleted?.deletedAt).toBeTruthy()
  })

  test('it should filter a book list by author', async ({ expect }) => {
    await BookFactory.merge([
      {
        author: 'George Orwell',
      },
      {
        author: 'Lewis Carrol',
      },
      {
        author: 'George Orwell',
        deletedAt: DateTime.now(),
      },
    ]).createMany(3)

    const sut = new BookService()
    const books = await sut.getBooksByFilter('george')

    expect(books.length).toBe(1)
    expect(books[0].author).toBe('George Orwell')

    const anotherBooks = await sut.getBooksByFilter('carrol')

    expect(anotherBooks.length).toBe(1)
    expect(anotherBooks[0].author).toBe('Lewis Carrol')
  })

  test('it should filter a book list by title', async ({ expect }) => {
    await BookFactory.merge([
      {
        title: 'Alice no País das Maravilhas',
      },
      {
        title: '1984',
      },
    ]).createMany(2)
    const sut = new BookService()
    const books = await sut.getBooksByFilter('alice')

    expect(books.length).toBe(1)
    expect(books[0].title).toBe('Alice no País das Maravilhas')

    const anotherBooks = await sut.getBooksByFilter('1984')

    expect(anotherBooks.length).toBe(1)
    expect(anotherBooks[0].title).toBe('1984')
  })

  test('it should filter a book list by description', async ({ expect }) => {
    await BookFactory.merge([
      {
        author: 'any description for a book',
      },
      {
        author: 'another description for a book',
      },
    ]).createMany(2)
    const sut = new BookService()
    const books = await sut.getBooksByFilter('any description')

    expect(books.length).toBe(1)

    const anotherBooks = await sut.getBooksByFilter('another description')

    expect(anotherBooks.length).toBe(1)
  })
})
