import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { BookCategoryEnum } from '../enums/BookCategoryEnum.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare author: string

  @column()
  declare description: string

  @column()
  declare price: number

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
}
