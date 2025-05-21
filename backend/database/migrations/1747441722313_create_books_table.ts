import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('titulo')
      table.text('autor')
      table.text('descricao').nullable()
      table.integer('preco')
      table.text('image_url').nullable()
      table.integer('estoque')
      table.enum('category', ['bible', 'teology', 'philosophy', 'science', 'others'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
