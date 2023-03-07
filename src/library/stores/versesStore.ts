import { Verse } from '../models/verse'

export function useVersesStore() {
  async function get(verseId: string):Promise<Verse> {
    return {
      'id': verseId,
      // '@type': 'verse',
      // 'language': 'ru',
      'number': 'БГ 1.1',
      'text': [
          'дхр̣тара̄шт̣ра ува̄ча',
          'дхарма-кшетре куру-кшетре',
          'самавета̄ йуйутсавах̣',
          'ма̄мака̄х̣ па̄н̣д̣ава̄ш́ чаива',
          'ким акурвата сан̃джайа'
      ],
      'synonyms': [
          {
              'words': [
                  'дхр̣тара̄шт̣рах̣',
                  'ува̄ча'
              ],
              'translation': 'царь Дхритараштра сказал'
          },
          {
              'words': [
                  'дхарма',
                  'кшетре'
              ],
              'translation': 'в месте паломничества'
          },
          {
              'words': [
                  'куру',
                  'кшетре'
              ],
              'translation': 'в месте под названием Курукшетра'
          },
          {
              'words': [
                  'самавета̄х̣'
              ],
              'translation': 'собравшиеся'
          },
          {
              'words': [
                  'йуйутсавах̣'
              ],
              'translation': 'желающие вступить в бой'
          },
          {
              'words': [
                  'ма̄мака̄х̣'
              ],
              'translation': 'те, кто на моей стороне (мои сыновья)'
          },
          {
              'words': [
                  'па̄н̣д̣ава̄х̣'
              ],
              'translation': 'сыновья Панду'
          },
          {
              'words': [
                  'ча'
              ],
              'translation': 'и'
          },
          {
              'words': [
                  'эва'
              ],
              'translation': 'безусловно'
          },
          {
              'words': [
                  'ким'
              ],
              'translation': 'что'
          },
          {
              'words': [
                  'акурвата'
              ],
              'translation': 'сделали'
          },
          {
              'words': [
                  'сан̃джайа'
              ],
              'translation': 'о Санджая'
          }
      ],
      'translation': 'Дхритараштра спросил: О Санджая, что стали делать мои сыновья и сыновья Панду, когда, горя желанием вступить в бой, собрались в месте паломничества, на поле Курукшетра?',
      // 'textAudioUri': 'audio/bg-01-01.mp3',
      // 'textImageUri': 'verses/ru/bg-01-01.svg'
    }
  }

  async function update(verse: Verse) {
    console.log(verse)
  }

  return { get, update }
}