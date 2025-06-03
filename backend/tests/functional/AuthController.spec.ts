import User from '#models/user'
import { errors } from '@adonisjs/auth'
import { test } from '@japa/runner'

test.group('Auth Controller', (group) => {
  group.setup(async () => {
    await User.create({
      email: 'any_mail@mail.com',
      password: 'password',
    })
  })

  test('/POST - return 204 if credentials are correct', async ({ client, expect }) => {
    const response = await client.post('/api/auth/login').json({
      email: 'any_mail@mail.com',
      password: 'password',
    })

    expect(response.status()).toBe(204)
  })

  test('/POST - return 401 if credentials are incorrect', async ({ client, expect }) => {
    const response = await client.post('/api/auth/login').json({
      email: 'another_mail@mail.com',
      password: 'another_password',
    })

    const { code, message } = new errors.E_INVALID_CREDENTIALS('Invalid user credentials')
    expect(response.status()).toBe(401)
    expect(response.body()).toEqual({ code, message })
  })
})
