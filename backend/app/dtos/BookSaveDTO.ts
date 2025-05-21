import { BookCategoryEnum } from '../enums/BookCategoryEnum.js'

export interface BookSaveDTO {
  titulo: string
  autor: string
  descricao?: string
  estoque: number
  preco: number
  imagem?: string
  categoria: BookCategoryEnum
}
