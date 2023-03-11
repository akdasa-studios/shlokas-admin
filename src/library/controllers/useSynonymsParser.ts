import { distance } from 'fastest-levenshtein'
import { Synonym } from '../models/verse'


export function useSynonymsParser() {
  interface ParseResult {
    sysnonyms: Synonym[],
    hasError: boolean,
  }

  function parse(
    text: string,
    lines: string[]
  ): ParseResult {
    try {
      const result: Synonym[] = []
      const firstLevelSeparators = /;/
      const secondLevelSeparators = /—/
      let lastLineNumber = 0

      const sentences = text.split(firstLevelSeparators)
      for (const sentence of sentences) {
        const synonyms = sentence.split(secondLevelSeparators)
        const words =  (synonyms[0] || '').trim()
        const translation = (synonyms[1] || '').trim()
        const lineNumber = Math.max(lastLineNumber, findLineNumber(words, lines))

        lastLineNumber = lineNumber
        result.push({
          words: words.split(' '),
          translation: translation,
          lineNumber: lineNumber
        })
      }

      return {
        sysnonyms: result,
        hasError: false
      }
    } catch (e) {
      console.error(e)
      return {
        sysnonyms: [],
        hasError: true
      }
    }
  }

  function findLineNumber(words: string, lines: string[]) {
    const values = lines.map(x => scores(x, words))
    return values.indexOf(Math.min(...values))
  }

  function scores(line: string, word: string): number {
    const tokens = line.split(' ')
    const distances = tokens.map(t => distance(t, word))
    return Math.min(...distances)
}

  return { parse }
}