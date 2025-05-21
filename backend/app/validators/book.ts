import vine from '@vinejs/vine'
import { BookCategoryEnum } from '../enums/BookCategoryEnum.js'

export const getBookByIdValidator = vine.compile(
  vine.object({
    id: vine
      .string()
      .regex(/^\d+$/)
      .transform((value) => Number(value)),
  })
)

export const getBooksByFilter = vine.compile(
  vine.object({
    q: vine.string(),
  })
)

export const createBookValidator = vine.compile(
  vine.object({
    titulo: vine.string().minLength(3),
    author: vine.string().minLength(3),
    description: vine.string().optional(),
    imageURL: vine.string().url().optional(),
    stock: vine.number().positive(),
    preco: vine.number().positive().withoutDecimals(),
    category: vine.enum(BookCategoryEnum),
  })
)

export const updateBookValidator = vine.compile(
  vine.object({
    id: vine
      .string()
      .regex(/^\d+$/)
      .transform((value) => Number(value)),
    titulo: vine.string().minLength(3).optional(),
    author: vine.string().minLength(3).optional(),
    description: vine.string().optional().optional(),
    imageURL: vine.string().url().optional().optional(),
    stock: vine.number().positive().optional(),
    preco: vine.number().positive().optional(),
    category: vine.enum(BookCategoryEnum).optional(),
  })
)

export const deleteBookValidator = vine.compile(
  vine.object({
    id: vine
      .string()
      .regex(/^\d+$/)
      .transform((value) => Number(value)),
  })
)
