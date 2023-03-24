import getUuid from 'uuid-by-string'
import { useDatabase } from '@/shared/services/useDatabase'
import { useRepository } from '@/shared/services/useRepository'
import { VerseImage } from '@/images'

export function useVerseImagesRepository() {
  const _database = useDatabase()
  const _repo     = useRepository<VerseImage>(_database, 'verseImage')

  async function getAllImages(): Promise<VerseImage[]> {
    return await _repo.all()
  }

  async function getImagesOfVerse(verseId: string): Promise<VerseImage[]> {
    return await _repo.find({ verseId })
  }

  async function saveVerseImage(verseImage: VerseImage) {
    verseImage._id = getUuid(`verse-image-${verseImage.verseId}-${verseImage.theme}`)
    return await _repo.save(verseImage)
  }

  async function removeImage(id: string) {
    await _database.remove(id)
  }

  async function getImage(id: string): Promise<VerseImage> {
    return await _repo.get(id)
  }

  return {
    getImage, getAllImages, saveVerseImage, removeImage, getImagesOfVerse
  }
}