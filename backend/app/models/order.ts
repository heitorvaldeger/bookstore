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
  declare cliente: string

  @column.dateTime({ autoCreate: true, serializeAs: 'data' })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @manyToMany(() => Book, {
    pivotColumns: ['quantidade'],
  })
  declare books: ManyToMany<typeof Book>
}
