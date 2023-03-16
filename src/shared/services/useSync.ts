import { ref } from 'vue'
import { useDatabase } from '@/shared'
import { useAuthStore } from '@/auth'

export function useSync() {
  const _database = useDatabase()
  const _auth = useAuthStore()
  const _isSyncing = ref(false)

  async function sync() {
    const env = process.env.NODE_ENV
    const host = env === 'production' ? 'shlokas.app' : 'localhost'
    const protocol = env === 'production' ? 'https' : 'http'

    const url = `${protocol}://${_auth.login}:${_auth.password}@${host}/db/shlokas`
    _isSyncing.value = true
    await _database.sync(url)
    _isSyncing.value = false
  }

  return { sync, isSyncing: _isSyncing }
}