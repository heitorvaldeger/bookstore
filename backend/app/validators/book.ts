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
    autor: vine.string().minLength(3),
    descricao: vine.string().optional(),
    imagem: vine.string().url().optional(),
    estoque: vine.number().positive(),
    preco: vine.number().positive().withoutDecimals(),
    categoria: vine.enum(BookCategoryEnum),
  })
)

export const updateBookValidator = vine.compile(
  vine.object({
    id: vine
      .string()
      .regex(/^\d+$/)
      .transform((value) => Number(value)),
    titulo: vine.string().minLength(3).optional(),
    autor: vine.string().minLength(3).optional(),
    descricao: vine.string().optional().optional(),
    imagem: vine.string().url().optional().optional(),
    estoque: vine.number().positive().optional(),
    preco: vine.number().positive().optional(),
    categoria: vine.enum(BookCategoryEnum).optional(),
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
