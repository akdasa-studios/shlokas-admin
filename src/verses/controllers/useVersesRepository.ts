import getUuid from 'uuid-by-string'
import { useDatabase } from '@/shared/services/useDatabase'
import { useRepository } from '@/shared/services/useRepository'
import { Verse } from '@/verses'

export function useVersesRepository() {
  const _database = useDatabase()
  const _repo     = useRepository<Verse>(_database, 'verse')

  async function getAllVerses(): Promise<Verse[]> {
    return await _repo.all()
  }

  async function saveVerse(verse: Verse) {
    verse._id = getUuid(`verse-${verse.language}-${verse.number}`)
    return await _repo.save(verse)
  }

  async function removeVerse(id: string) {
    await _database.remove(id)
  }

  async function getVerse(id: string): Promise<Verse> {
    return await _repo.get(id)
  }

  return {
    getVerse, getAllVerses, saveVerse, removeVerse
  }
}