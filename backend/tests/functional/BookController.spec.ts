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
    const response = await client.get('/books')

    expect(response.status()).toBe(200)
    expect(response.body()).toEqual(books.map((book) => book.serialize()))
  })

  test('/GET - return 200 with a book if id valid is provided', async ({ client, expect }) => {
    const response = await client.get(`/books/search/${books[0].id}`)

    const book = response.body()

    expect(response.status()).toBe(200)
    expect(books[0].serialize()).toEqual(book)
  })

  test('/GET - return 422 if id invalid is provided on get book by id', async ({
    client,
    expect,
  }) => {
    const response = await client.get('/books/search/any_value')

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
        author: 'George Orwell',
        title: '1984',
        description:
          'Um romance distópico sobre um regime totalitário que controla todos os aspectos da vida dos cidadãos, incluindo seus pensamentos.',
      },
      {
        author: 'Jane Austen',
        title: 'Orgulho e Preconceito',
        description:
          'Uma história sobre amor, classe social e orgulho, centrada na vida de Elizabeth Bennet e Mr. Darcy na Inglaterra do século XIX.',
      },
      {
        author: 'Haruki Murakami',
        title: 'Kafka à Beira-Mar',
        description:
          'Uma história surreal e simbólica sobre um adolescente que foge de casa e um homem idoso com habilidades misteriosas.',
      },
    ]).createMany(3)
    const [response, anotherResponse] = await Promise.all([
      client.get(`/books/search`).qs({ q: 'George' }),
      client.get(`/books/search`).qs({ q: 'história' }),
    ])

    const body = response.body()

    expect(response.status()).toBe(200)
    expect(body.length).toBe(1)
    expect(body[0].author).toBe('George Orwell')

    const anotherBody = anotherResponse.body()
    expect(response.status()).toBe(200)
    expect(anotherBody.length).toBe(2)
  })

  test('/GET - return 422 on get books by search if query search is not provided', async ({
    client,
    expect,
  }) => {
    const response = await client.get(`/books/search`)

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

  test('/POST - return 200 if book was created with success', async ({ client, expect }) => {
    const payload = {
      title: 'any_title',
      description: 'any_description',
      author: 'any_author',
      imageURL: 'https://any-url.com',
      category: BookCategoryEnum.BIBLE,
      price: 999,
      stock: 100,
    }

    const user = await makeUser()

    const response = await client.post('/books').json(payload).loginAs(user)

    const { id, ...body } = response.body()

    expect(response.status()).toBe(200)
    expect(id).toBeTruthy()
    expect(body).toEqual(payload)
  })

  test('/POST - return 422 if book fields is invalid', async ({ client, expect }) => {
    const user = await makeUser()
    const response = await client.post('/books').json({}).loginAs(user)

    const body = response.body()

    expect(response.status()).toBe(422)
    expect(body).toEqual({
      errors: [
        {
          message: 'The title field must be defined',
          rule: 'required',
          field: 'title',
        },
        {
          message: 'The author field must be defined',
          rule: 'required',
          field: 'author',
        },
        {
          message: 'The stock field must be defined',
          rule: 'required',
          field: 'stock',
        },
        {
          message: 'The price field must be defined',
          rule: 'required',
          field: 'price',
        },
        {
          message: 'The category field must be defined',
          rule: 'required',
          field: 'category',
        },
      ],
    })
  })

  test('/PUT - return 200 if book was updated with success', async ({ client, expect }) => {
    const user = await makeUser()

    const book = await BookFactory.create()
    const response = await client
      .put(`/books/${book.id}`)
      .json({
        title: 'another_title',
        description: 'another_description',
      })
      .loginAs(user)

    const body = response.body()

    expect(response.status()).toBe(200)
    expect(body.title).toBe('another_title')
    expect(body.description).toBe('another_description')
  })

  test("/PUT - return 404 if a book doesn't exists on update", async ({ client, expect }) => {
    const user = await makeUser()
    const response = await client
      .put(`/books/9999`)
      .json({
        title: 'another title',
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
      .put(`/books/${book.id}`)
      .json({
        price: 'any_value',
      })
      .loginAs(user)

    const body = response.body()

    expect(response.status()).toBe(422)
    expect(body).toEqual({
      errors: [
        {
          message: 'The price field must be a number',
          rule: 'number',
          field: 'price',
        },
      ],
    })
  })

  test('/DELETE - return 200 if book was deleted with success', async ({ client, expect }) => {
    const user = await makeUser()

    const book = await BookFactory.create()
    const response = await client.delete(`/books/${book.id}`).loginAs(user)

    expect(response.status()).toBe(204)
  })

  test("/DELETE - return 404 if a book doesn't exists on delete", async ({ client, expect }) => {
    const user = await makeUser()

    const response = await client.delete(`/books/99999`).loginAs(user)
    expect(response.status()).toBe(404)
  })

  test('/DELETE - return 422 if id passed is invalid on delete', async ({ client, expect }) => {
    const user = await makeUser()

    const response = await client.delete(`/books/any_value`).loginAs(user)

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
