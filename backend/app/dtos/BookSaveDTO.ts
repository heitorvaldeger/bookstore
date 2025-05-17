import { BookCategoryEnum } from '../enums/BookCategoryEnum.js'

export interface BookSaveDTO {
  title: string
  author: string
  description: string
  stock: number
  price: number
  category: BookCategoryEnum
}
