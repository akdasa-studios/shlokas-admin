import { useDatabase } from '@/shared/services/useDatabase'
import { useRepository } from '@/shared/services/useRepository'
import { Verse } from '../models/verse'


export function useVerseDetailsController() {
  const _database = useDatabase()
  const _verses = useRepository<Verse>(_database, 'verse')

  async function getVerse(id: string): Promise<Verse> {
    return await _verses.get(id)
  }

  async function saveVerse(verse: Verse) {
    await _database.put(verse)
  }


  return {
    getVerse, saveVerse
  }
}