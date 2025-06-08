import { BookFactory } from '#database/factories/BookFactory'
import Book from '#models/book'
import { test } from '@japa/runner'
import { BookCategoryEnum } from '../../app/enums/BookCategoryEnum.js'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'

const makeUser = async () => {
  await User.query().delete()

  return await User.create({
    email: 'any_email@mail.com',
    password: 'any_password',
  })
}

test.group('Book Controller', (group) => {
  let books: Book[] = []
  group.each.setup(async () => {
    const trx = await db.beginGlobalTransaction()
    books = await BookFactory.query({
      client: trx,
    }).createMany(10)

    return () => trx.rollback()
  })

  test('/GET - return 200 with all books in database', async ({ client, expect }) => {
    const response = await client.get('/api/books')

    expect(response.status()).toBe(200)
    expect(response.body()).toEqual(books.map((book) => book.serialize()))
  })

  test('/GET - return 200 with a book if id valid is provided', async ({ client, expect }) => {
    const response = await client.get(`/api/books/search/${books[0].id}`)

    const book = response.body()

    expect(response.status()).toBe(200)
    expect(books[0].serialize()).toEqual(book)
  })

  test('/GET - return 422 if id invalid is provided on get book by id', async ({
    client,
    expect,
  }) => {
    const response = await client.get('/api/books/search/any_value')

    const body = response.body()

    expect(response.status()).toBe(422)
    expect(body).toEqual({
      errors: [
        {
          field: 'id',
          message: 'The id field format is invalid',
          rule: 'regex',
        },
      ],
    })
  })

  test('/GET - return 200 on get books by search if query search is provided', async ({
    client,
    expect,
  }) => {
    await BookFactory.merge([
      {
        autor: 'George Orwell',
        titulo: '1984',
        descricao:
          'Um romance distópico sobre um regime totalitário que controla todos os aspectos da vida dos cidadãos, incluindo seus pensamentos.',
      },
      {
        autor: 'Jane Austen',
        titulo: 'Orgulho e Preconceito',
        descricao:
          'Uma história sobre amor, classe social e orgulho, centrada na vida de Elizabeth Bennet e Mr. Darcy na Inglaterra do século XIX.',
      },
      {
        autor: 'Haruki Murakami',
        titulo: 'Kafka à Beira-Mar',
        descricao:
          'Uma história surreal e simbólica sobre um adolescente que foge de casa e um homem idoso com habilidades misteriosas.',
      },
    ]).createMany(3)
    const [response, anotherResponse] = await Promise.all([
      client.get(`/api/books/search`).qs({ q: 'George' }),
      client.get(`/api/books/search`).qs({ q: 'história' }),
    ])

    const body = response.body()

    expect(response.status()).toBe(200)
    expect(body.length).toBe(1)
    expect(body[0].autor).toBe('George Orwell')

    const anotherBody = anotherResponse.body()
    expect(response.status()).toBe(200)
    expect(anotherBody.length).toBe(2)
  })

  test('/GET - return 422 on get books by search if query search is not provided', async ({
    client,
    expect,
  }) => {
    const response = await client.get(`/api/books/search`)

    const body = response.body()
    expect(response.status()).toBe(422)
    expect(body).toEqual({
      errors: [
        {
          message: 'The q field must be defined',
          rule: 'required',
          field: 'q',
        },
      ],
    })
  })

  test('/POST - return 201 if book was created with success', async ({ client, expect }) => {
    const payload = {
      titulo: 'any_title',
      descricao: 'any_description',
      autor: 'any_author',
      imagem: 'https://any-url.com',
      categoria: BookCategoryEnum.BIBLE,
      preco: 999,
      estoque: 100,
    }

    const user = await makeUser()

    const response = await client.post('/api/books').json(payload).loginAs(user)

    const { id, ...body } = response.body()

    expect(response.status()).toBe(201)
    expect(id).toBeTruthy()
    expect(body).toEqual(payload)
  })

  test('/POST - return 422 if book fields is invalid', async ({ client, expect }) => {
    const user = await makeUser()
    const response = await client.post('/api/books').json({}).loginAs(user)

    const body = response.body()

    expect(response.status()).toBe(422)
    expect(body).toEqual({
      errors: [
        {
          message: 'The titulo field must be defined',
          rule: 'required',
          field: 'titulo',
        },
        {
          message: 'The autor field must be defined',
          rule: 'required',
          field: 'autor',
        },
        {
          message: 'The estoque field must be defined',
          rule: 'required',
          field: 'estoque',
        },
        {
          message: 'The preco field must be defined',
          rule: 'required',
          field: 'preco',
        },
        {
          message: 'The categoria field must be defined',
          rule: 'required',
          field: 'categoria',
        },
      ],
    })
  })

  test('/PUT - return 200 if book was updated with success', async ({ client, expect }) => {
    const user = await makeUser()

    const book = await BookFactory.create()
    const response = await client
      .put(`/api/books/${book.id}`)
      .json({
        titulo: 'another_title',
        descricao: 'another_description',
      })
      .loginAs(user)

    const body = response.body()

    expect(response.status()).toBe(200)
    expect(body.titulo).toBe('another_title')
    expect(body.descricao).toBe('another_description')
  })

  test("/PUT - return 404 if a book doesn't exists on update", async ({ client, expect }) => {
    const user = await makeUser()
    const response = await client
      .put(`/api/books/9999`)
      .json({
        titulo: 'another titulo',
      })
      .loginAs(user)

    const body = response.body()

    expect(response.status()).toBe(404)
    expect(body).toEqual({ code: 'E_BOOK_NOT_FOUND', message: 'Book not found' })
  })

  test('/PUT - return 422 if some field is invalid on update', async ({ client, expect }) => {
    const user = await makeUser()

    const book = await BookFactory.create()
    const response = await client
      .put(`/api/books/${book.id}`)
      .json({
        preco: 'any_value',
      })
      .loginAs(user)

    const body = response.body()

    expect(response.status()).toBe(422)
    expect(body).toEqual({
      errors: [
        {
          message: 'The preco field must be a number',
          rule: 'number',
          field: 'preco',
        },
      ],
    })
  })

  test('/DELETE - return 204 if book was deleted with success', async ({ client, expect }) => {
    const user = await makeUser()

    const book = await BookFactory.create()
    const response = await client.delete(`/api/books/${book.id}`).loginAs(user)

    expect(response.status()).toBe(204)
  })

  test("/DELETE - return 404 if a book doesn't exists on delete", async ({ client, expect }) => {
    const user = await makeUser()

    const response = await client.delete(`/api/books/99999`).loginAs(user)
    expect(response.status()).toBe(404)
  })

  test('/DELETE - return 422 if id passed is invalid on delete', async ({ client, expect }) => {
    const user = await makeUser()

    const response = await client.delete(`/api/books/any_value`).loginAs(user)

    const body = response.body()

    expect(response.status()).toBe(422)
    expect(body).toEqual({
      errors: [
        {
          field: 'id',
          message: 'The id field format is invalid',
          rule: 'regex',
        },
      ],
    })
  })
})
