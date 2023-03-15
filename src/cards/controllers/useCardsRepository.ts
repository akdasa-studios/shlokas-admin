import getUuid from 'uuid-by-string'
import { useDatabase } from '@/shared/services/useDatabase'
import { useRepository } from '@/shared/services/useRepository'
import { Card } from '@/cards'

export function useCardsRepository() {
  const _database = useDatabase()
  const _repo     = useRepository<Card>(_database, 'card')

  async function getAllCards(): Promise<Card[]> {
    return await _repo.all()
  }

  async function saveCard(card: Card) {
    card._id = getUuid(`card-${card.verseId}-${card.theme}`)
    return await _repo.save(card)
  }

  async function removeCard(id: string) {
    await _database.remove(id)
  }

  async function getCard(id: string): Promise<Card> {
    return await _repo.get(id)
  }

  return {
    getCard, getAllCards, saveCard, removeCard
  }
}