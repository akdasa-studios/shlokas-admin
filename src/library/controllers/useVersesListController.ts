import getUuid from 'uuid-by-string'
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

  async function addVerse(data: Pick<Verse, 'number' | 'text' | 'translation' | 'language'>) {
    const id = getUuid(data.language + data.number.toUpperCase(), 3)
    await _database.put({
      ...data,
      '@type': 'verse',
      _id: id,
    })
  }

  async function remove(id: string) {
    await _database.remove(id)
  }

  async function sync() {
    const env = process.env.NODE_ENV
    const host = env === 'production' ? 'shlokas.app' : 'localhost'
    const protocol = env === 'production' ? 'https' : 'http'

    const url = `${protocol}://${_auth.login}:${_auth.password}@${host}/db/shlokas`
    console.log(url)
    const res = await _database.sync(url)
    console.log(res)
  }

  return {
    getAllVerses, addVerse, sync, remove
  }
}