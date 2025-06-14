import User from '#models/user'
import { inject } from '@adonisjs/core'
import { AuthLoginDTO } from '../dtos/AuthLoginDTO.js'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'

@inject()
export class AuthService {
  constructor(private readonly auth: Authenticator<Authenticators>) {}
  async login({ email, password }: AuthLoginDTO) {
    const user = await User.verifyCredentials(email, password)

    await this.auth.use('web').login(user)
  }

  async getUserLogged() {
    const isUserLogged = await this.auth.check()
    if (isUserLogged) {
      return this.auth.user?.serialize()
    }

    return null
  }
}
