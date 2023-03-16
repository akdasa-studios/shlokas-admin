import getUuid from 'uuid-by-string'
import { useDatabase } from '@/shared/services/useDatabase'
import { useRepository } from '@/shared/services/useRepository'
import { Image } from '@/images'

export function useImagesRepository() {
  const _database = useDatabase()
  const _repo     = useRepository<Image>(_database, 'card')

  async function getAllImages(): Promise<Image[]> {
    return await _repo.all()
  }

  async function getImagesOfVerse(verseId: string): Promise<Image[]> {
    return await _repo.find({ verseId })
  }

  async function saveImage(card: Image) {
    card._id = getUuid(`card-${card.verseId}-${card.theme}`)
    return await _repo.save(card)
  }

  async function removeImage(id: string) {
    await _database.remove(id)
  }

  async function getImage(id: string): Promise<Image> {
    return await _repo.get(id)
  }

  return {
    getImage, getAllImages, saveImage, removeImage, getImagesOfVerse
  }
}