import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.updateOrCreate(
      {
        email: 'mail@mail.com',
      },
      {
        email: 'mail@mail.com',
        password: '1234',
      }
    )
  }
}
