import vine from '@vinejs/vine'
import { BookCategoryEnum } from '../enums/BookCategoryEnum.js'

export const getBooksByCategoryValidator = vine.compile(
  vine.object({
    category: vine.enum(BookCategoryEnum),
  })
)

export const createOrUpdateBookValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3),
    author: vine.string().minLength(3),
    description: vine.string().optional(),
    imageURL: vine.string().url().optional(),
    stock: vine.number().positive(),
    price: vine.number().positive(),
    category: vine.enum(BookCategoryEnum),
  })
)
