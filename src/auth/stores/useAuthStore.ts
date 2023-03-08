import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const _login = ref('')
  const _password = ref('')
  const _isAuthenticated = ref(false)

  /**
   * Log in to the application
   * @param login Login
   * @param password Password
   * @returns True if login and password are correct, false otherwise
   */
  async function loggedIn(
    login: string,
    password: string
  ) {
    _login.value = login
    _password.value = password
    _isAuthenticated.value = true
  }

  return {
    loggedIn,
    isAuthenticated: _isAuthenticated
  }
})