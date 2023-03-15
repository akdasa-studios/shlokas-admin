import getUuid from 'uuid-by-string'
import { useDatabase } from '@/shared/services/useDatabase'
import { useRepository } from '@/shared/services/useRepository'
import { Declamation } from '@/declamations'

export function useDeclamationsRepository() {
  const _database = useDatabase()
  const _repo     = useRepository<Declamation>(_database, 'declamation')

  async function getAllDeclamations(): Promise<Declamation[]> {
    return await _repo.all()
  }

  async function getDeclamationsOfVerseReference(verseReference: string): Promise<Declamation[]> {
    return await _repo.find({ verseReference })
  }

  async function saveDeclamation(declamation: Declamation) {
    declamation._id = getUuid(`declamation-${declamation.verseReference}-${declamation.theme}`)
    return await _repo.save(declamation)
  }

  async function removeDeclamation(id: string) {
    await _database.remove(id)
  }

  async function getDeclamation(id: string): Promise<Declamation> {
    return await _repo.get(id)
  }

  return {
    getDeclamation, getAllDeclamations, saveDeclamation, removeDeclamation, getDeclamationsOfVerseReference
  }
}