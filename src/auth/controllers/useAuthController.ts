import { Router } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'
import { useAuthService } from '../services/useAuthService'

export class AuthController {
  constructor (private readonly router: Router) {}

  async logIn(login: string, password: string): Promise<boolean> {
    const authService = useAuthService()
    const authStore = useAuthStore()

    const authResult = await authService.logIn({ login, password })
    if (authResult.isSuccessful) {
      authStore.loggedIn(login, password)
      this.router.push({ name: 'home' })
      return true
    } else {
      return false
    }
  }
}

export function useAuthController(router: Router) {
  return new AuthController(router)
}