import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Order from './order.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
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

  @column()
  declare image: string

  @column()
  declare stock: number

  @column()
  declare category: BookCategoryEnum

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @manyToMany(() => Order)
  declare orders: ManyToMany<typeof Order>
}
