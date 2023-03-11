import { Synonym } from '../models/verse'

export function useSynonymsParser() {
  interface ParseResult {
    sysnonyms: Synonym[],
    hasError: boolean,
  }

  function parse(text: string): ParseResult {
    try {
      const result: Synonym[] = []
      const firstLevelSeparators = /;/
      const secondLevelSeparators = /—/

      const sentences = text.split(firstLevelSeparators)
      for (const sentence of sentences) {
        const synonyms = sentence.split(secondLevelSeparators)
        result.push({
          words: synonyms[0].trim().split(' '),
          translation: synonyms[1].trim(),
        })
      }

      return {
        sysnonyms: result,
        hasError: false
      }
    } catch {
      return {
        sysnonyms: [],
        hasError: true
      }
    }
  }

return { parse }
}