import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import { BookCategoryEnum } from '../../app/enums/BookCategoryEnum.js'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    return {
      autor: faker.person.fullName(),
      titulo: faker.lorem.sentence(3),
      categoria: BookCategoryEnum.SCIENCE,
      descricao: faker.lorem.sentence(5),
      imageURL: faker.internet.url(),
      preco: 999,
      estoque: 100,
    }
  })
  .build()
