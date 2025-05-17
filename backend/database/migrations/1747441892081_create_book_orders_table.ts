import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'book_orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('book_id').references('id').inTable('books')
      table.bigInteger('order_id').references('id').inTable('orders')
      table.integer('quantity')
      table.enum('status', ['pending', 'paid', 'canceled'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
