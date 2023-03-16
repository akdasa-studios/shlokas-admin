import { useEnvironment } from '@/shared/services/useEnvironment'


export function useTotpService() {
  const env = useEnvironment()

  async function validate(token: string): Promise<boolean> {
    const response = await fetch(env.getTotpUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: token })
    })
    const data = await response.json()
    if (!data.status) { return false }
    return true
  }

  return { validate }
}