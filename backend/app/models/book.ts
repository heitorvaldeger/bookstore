import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { BookCategoryEnum } from '../enums/BookCategoryEnum.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare author: string

  @column()
  declare description: string

  @column()
  declare preco: number

  @column({ serializeAs: 'imageURL' })
  declare imageURL: string

  @column()
  declare stock: number

  @column()
  declare category: BookCategoryEnum

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime
}
