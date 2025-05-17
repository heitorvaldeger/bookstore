import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import { BookCategoryEnum } from '../../app/enums/BookCategoryEnum.js'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    return {
      author: faker.person.fullName(),
      title: faker.lorem.sentence(3),
      category: BookCategoryEnum.SCIENCE,
      description: faker.lorem.sentence(5),
      price: 999,
      stock: 100,
    }
  })
  .build()
