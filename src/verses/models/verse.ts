import { transliterate as tr } from 'transliteration'

export interface Synonym {
  words: string[];
  translation: string;
  lineNumber?: number;
}

export interface Verse {
  _id: string;
  number: string;
  reference: string;

  text: string[];
  translation: string;
  synonyms: Synonym[];
  language: string;
}

export function getVerseReference(number: string) {
  return tr(number).toUpperCase().replace('\'', '')
}

export function isVerseNumberValid(number: string) {
  console.log(number)
  if (number.toUpperCase() != number) return false
  if (number.trim() != number) return false

  const tokens = number.split(' ')
  if (tokens.length != 2) return false
  if (tokens[0].includes('.')) return false
  if (tokens[1].endsWith('.')) return false

  return true
}

export function isVerseReferencdValid(number: string) {
  if (number != getVerseReference(number)) return false
  return isVerseNumberValid(number)
}