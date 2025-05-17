import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'book_orders'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')
    })

    this.schema.alterTable('orders', (table) => {
      table.enum('status', ['pending', 'paid', 'canceled'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('status', ['pending', 'paid', 'canceled'])
    })

    this.schema.alterTable('orders', (table) => {
      table.dropColumn('status')
    })
  }
}
