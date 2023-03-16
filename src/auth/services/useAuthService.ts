import PouchDB from 'pouchdb'
import { useEnvironment } from '@/shared/services/useEnvironment'

export function useAuthService() {
  const env = useEnvironment()

  async function logIn(login: string, password: string): Promise<boolean> {
    const connectionString = env.getDatabaseUrl(login, password, 'shlokas')
    const db = new PouchDB(connectionString)
    try {
      await db.info()
    } catch {
      return false
    }
    return true
  }

  return { logIn }
}