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
      table.text('imagem').nullable()
      table.integer('estoque')
      table.enu('categoria', ['bible', 'teology', 'philosophy', 'science', 'others'], {
        useNative: true,
        enumName: 'categoria_type',
        existingType: true,
      })
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
