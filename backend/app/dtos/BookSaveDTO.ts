import { BookCategoryEnum } from '../enums/BookCategoryEnum.js'

export interface BookSaveDTO {
  titulo: string
  autor: string
  descricao?: string
  stock: number
  preco: number
  imageURL?: string
  category: BookCategoryEnum
}
