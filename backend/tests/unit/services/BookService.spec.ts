import { stub } from 'sinon'
import { BookFactory } from '#database/factories/BookFactory'
import { BookService } from '#services/BookService'
import { test } from '@japa/runner'
import { BookCategoryEnum } from '../../../app/enums/BookCategoryEnum.js'
import BookNotFoundException from '#exceptions/BookNotFoundException'
import Book from '#models/book'
import { BookSaveDTO } from '../../../app/dtos/BookSaveDTO.js'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

const bookToSave = {
  titulo: 'any_title',
  descricao: 'any_description',
  autor: 'any_author',
  imagem: 'any_image',
  categoria: BookCategoryEnum.BIBLE,
  preco: 999,
  estoque: 100,
}

test.group('Services book service', (group) => {
  let trx: TransactionClientContract
  group.each.setup(async () => {
    trx = await db.beginGlobalTransaction()

    return () => trx.rollback()
  })
  test('it should return all books in database', async ({ expect }) => {
    await BookFactory.query({ client: trx }).createMany(5)
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
    const book = await BookFactory.query({ client: trx }).create()
    const sut = new BookService()

    const bookToUpdate: BookSaveDTO = {
      ...bookToSave,
      descricao: 'another_description',
    }
    const bookUpdated = await sut.update(book.id, bookToUpdate)

    expect(bookUpdated.descricao).toBe(bookToUpdate.descricao)
  })

  test("it should return an exception on delete if book doesn't exists", async ({ expect }) => {
    stub(Book, 'find').resolves(null)
    const sut = new BookService()

    const deletePromise = sut.delete(1)
    expect(deletePromise).rejects.toThrow(new BookNotFoundException())
  })

  test('it should delete a book with success', async ({ expect }) => {
    const book = await BookFactory.query({ client: trx }).create()
    const sut = new BookService()
    await sut.delete(book.id)

    const bookDeleted = await Book.find(book.id)
    expect(bookDeleted?.deletedAt).toBeTruthy()
  })

  test('it should filter a book list by autor', async ({ expect }) => {
    await BookFactory.merge([
      {
        autor: 'George Orwell',
      },
      {
        autor: 'Lewis Carrol',
      },
      {
        autor: 'George Orwell',
        deletedAt: DateTime.now(),
      },
    ]).createMany(3)

    const sut = new BookService()
    const books = await sut.getBooksByFilter('george')

    expect(books.length).toBe(1)
    expect(books[0].autor).toBe('George Orwell')

    const anotherBooks = await sut.getBooksByFilter('carrol')

    expect(anotherBooks.length).toBe(1)
    expect(anotherBooks[0].autor).toBe('Lewis Carrol')
  })

  test('it should filter a book list by titulo', async ({ expect }) => {
    await BookFactory.merge([
      {
        titulo: 'Alice no País das Maravilhas',
      },
      {
        titulo: '1984',
      },
    ]).createMany(2)
    const sut = new BookService()
    const books = await sut.getBooksByFilter('alice')

    expect(books.length).toBe(1)
    expect(books[0].titulo).toBe('Alice no País das Maravilhas')

    const anotherBooks = await sut.getBooksByFilter('1984')

    expect(anotherBooks.length).toBe(1)
    expect(anotherBooks[0].titulo).toBe('1984')
  })

  test('it should filter a book list by descricao', async ({ expect }) => {
    await BookFactory.merge([
      {
        autor: 'any descricao for a book',
      },
      {
        autor: 'another descricao for a book',
      },
    ]).createMany(2)
    const sut = new BookService()
    const books = await sut.getBooksByFilter('any descricao')

    expect(books.length).toBe(1)

    const anotherBooks = await sut.getBooksByFilter('another descricao')

    expect(anotherBooks.length).toBe(1)
  })
})
