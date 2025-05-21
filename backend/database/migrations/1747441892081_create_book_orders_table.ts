import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'book_order'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('book_id').unsigned().references('books.id')
      table.integer('order_id').unsigned().references('orders.id')
      table.unique(['book_id', 'order_id'])

      table.integer('quantidade')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
