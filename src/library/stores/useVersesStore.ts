import { Verse } from '../models/verse'
import library from './temp.json'

export function useVersesStore() {

  async function all(): Promise<Verse[]> {
    return library
  }

  async function get(verseId: string):Promise<Verse> {
    return library.find(x => x._id === verseId) as Verse
  }

  async function update(verse: Verse) {
    console.log(verse)
    const idx = library.findIndex(x => x._id === verse._id)
    // @ts-ignore
    library[idx] = verse
  }

  return { all, get, update }
}