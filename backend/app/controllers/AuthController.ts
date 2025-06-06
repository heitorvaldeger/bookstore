import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { AuthService } from '#services/AuthService'
import { authLoginValidator } from '#validators/auth'

@inject()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(authLoginValidator)
      await this.authService.login(payload)

      return response.status(204)
    } catch (error) {
      throw error
    }
  }

  async me() {
    try {
      return await this.authService.getUserLogged()
    } catch (error) {
      throw error
    }
  }
}
