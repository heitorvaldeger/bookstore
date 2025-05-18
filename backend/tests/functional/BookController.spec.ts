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
    const response = await client.get(`/books/category/${BookCategoryEnum.OTHERS}`)

    const books = response.body()

    expect(response.status()).toBe(200)
    expect(books.length).toBe(3)
  })

  test('/GET - return 422 get books by category filter if field is invalid', async ({
    client,
    expect,
  }) => {
    const response = await client.get('/books/category/any_value')

    const body = response.body()

    expect(response.status()).toBe(422)
    expect(body).toEqual({
      errors: [
        {
          message: 'The selected categoryName is invalid',
          rule: 'enum',
          field: 'categoryName',
          meta: {
            choices: Object.values(BookCategoryEnum),
          },
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
        author: 'J.K. Rowling',
        title: 'Harry Potter e a Pedra Filosofal',
        description:
          'O início da jornada de um jovem bruxo que descobre um mundo mágico enquanto enfrenta forças das trevas em Hogwarts.',
      },
      {
        author: 'Haruki Murakami',
        title: 'Kafka à Beira-Mar',
        description:
          'Uma história surreal e simbólica sobre um adolescente que foge de casa e um homem idoso com habilidades misteriosas.',
      },
      {
        author: 'Gabriel García Márquez',
        title: 'Cem Anos de Solidão',
        description:
          'A saga mágica e trágica da família Buendía, marcada por ciclos de solidão e acontecimentos sobrenaturais na cidade fictícia de Macondo.',
      },
    ]).createMany(5)
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

  test('/GET - return 200 on get books by search if query search is provided', async ({
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
    const response = await client.post('/books').json(payload)

    const { id, ...body } = response.body()

    expect(response.status()).toBe(200)
    expect(id).toBeTruthy()
    expect(body).toEqual(payload)
  })

  test('/POST - return 422 if book fields is invalid', async ({ client, expect }) => {
    const response = await client.post('/books').json({})

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
    const book = await BookFactory.create()
    const response = await client.put(`/books/${book.id}`).json({
      title: 'another_title',
      description: 'another_description',
    })

    const body = response.body()

    expect(response.status()).toBe(200)
    expect(body.title).toBe('another_title')
    expect(body.description).toBe('another_description')
  })

  test('/PUT - return 422 if some field is invalid on update', async ({ client, expect }) => {
    const book = await BookFactory.create()
    const response = await client.put(`/books/${book.id}`).json({
      price: 'any_value',
    })

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
})
