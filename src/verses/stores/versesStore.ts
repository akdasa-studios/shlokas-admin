import { Verse } from '../models/verse'

export function useVersesStore() {
  async function get(verseId: string):Promise<Verse> {
    return {
      id: verseId,
      number: 'BG 2.13',
      text: [
        'dehino ’smin yathā dehe',
        'kaumāraṁ yauvanaṁ jarā',
        'tathā dehāntara-prāptir',
        'dhīras tatra na muhyati',
      ],
      translation: 'As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change.',
    }
  }

  return { get }
}