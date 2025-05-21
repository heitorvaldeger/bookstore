import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { OrderStatusEnum } from '../enums/OrderStatusEnum.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare status: OrderStatusEnum

  @column()
  declare customer: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @manyToMany(() => Book, {
    pivotColumns: ['quantity'],
  })
  declare books: ManyToMany<typeof Book>
}
