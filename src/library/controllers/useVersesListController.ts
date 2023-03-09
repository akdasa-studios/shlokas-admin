import { useDatabase } from '@/shared/services/useDatabase'
import { useRepository } from '@/shared/services/useRepository'
import { Verse } from '../models/verse'
import { useAuthStore } from './../../auth/stores/useAuthStore'

export function useVersesListController() {
  const _database = useDatabase()
  const _verses = useRepository<Verse>(_database, 'verse')
  const _auth = useAuthStore()

  async function getAllVerses(): Promise<Verse[]> {
    return await _verses.all()
  }

  async function sync() {
    const env = process.env.NODE_ENV
    const host = env === 'production' ? 'shlokas.app' : 'localhost'
    const url = `http://${_auth.login}:${_auth.password}@${host}/db/shlokas`
    console.log(url)
    await _database.sync(url)
  }

  return {
    getAllVerses, sync
  }
}