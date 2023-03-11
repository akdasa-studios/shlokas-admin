import { useEnvironment } from '@/shared/services/useEnvironment'

export interface Credentials {
  login: string,
  password: string,
  totp: string,
}

export interface LogInResult {
  isSuccessful: boolean,
  error?: string
}


export function useAuthService() {
  const env = useEnvironment()

  async function logIn(credentials: Credentials): Promise<LogInResult> {
    // validate TOTP
    const response = await fetch(env.getTotpUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: credentials.totp })
    })
    const data = await response.json()
    if (!data.status) { return { isSuccessful: false } }

    // validate login/password pair
    if (credentials.login != 'contentManager') {
      return { isSuccessful: false }
    }
    return {
      isSuccessful: true
    }
  }

  return {
    logIn
  }
}