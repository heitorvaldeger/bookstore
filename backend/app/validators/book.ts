import vine from '@vinejs/vine'
import { BookCategoryEnum } from '../enums/BookCategoryEnum.js'

export const getBooksByCategoryValidator = vine.compile(
  vine.object({
    category: vine.enum(BookCategoryEnum),
  })
)
