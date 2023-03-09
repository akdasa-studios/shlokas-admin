
export interface Credentials {
  login: string,
  password: string
}

export interface LogInResult {
  isSuccessful: boolean,
  error?: string
}

export class AuthService {
  async logIn(credentials: Credentials): Promise<LogInResult> {
    if (credentials.login != 'contentManager') {
      return { isSuccessful: false }
    }
    return {
      isSuccessful: true
    }
  }
}

export function useAuthService() {
  return new AuthService()
}