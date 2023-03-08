import { useDatabase } from '@/shared/services/useDatabase'
import { useRepository } from '@/shared/services/useRepository'
import { Verse } from '../models/verse'

export function useVersesListController() {
  const _database = useDatabase()
  const _verses = useRepository<Verse>(_database, 'verse')

  async function getAllVerses(): Promise<Verse[]> {
    return await _verses.all()
  }

  async function sync() {
    await _database.sync('http://localhost/db/shlokas')
  }

  return {
    getAllVerses, sync
  }
}