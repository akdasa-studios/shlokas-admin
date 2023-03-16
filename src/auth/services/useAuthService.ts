export function useAuthService() {
  async function logIn(login: string, password: string): Promise<boolean> {
    if (login != 'contentManager') {
      return false
    }
    return true
  }

  return { logIn }
}