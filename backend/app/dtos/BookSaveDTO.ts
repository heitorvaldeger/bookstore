import { BookCategoryEnum } from '../enums/BookCategoryEnum.js'

export interface BookSaveDTO {
  titulo: string
  author: string
  description?: string
  stock: number
  preco: number
  imageURL?: string
  category: BookCategoryEnum
}
