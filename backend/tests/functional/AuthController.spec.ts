import User from '#models/user'
import { test } from '@japa/runner'

test.group('Auth Controller', (group) => {
  let user: User
  group.setup(async () => {
    user = await User.create({
      email: 'any_mail@mail.com',
      password: '1234',
    })
  })

  test('/POST - return 204 if credentials are correct', async ({ client, expect }) => {
    const response = await client.post('/auth/login').json({
      email: 'any_mail@mail.com',
      password: '1234',
    })

    expect(response.status()).toBe(204)
  })
})
