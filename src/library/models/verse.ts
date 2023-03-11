export interface Synonym {
  words: string[];
  translation: string;
  lineNumber?: number;

  shortTranslation?: string;
  positionX?: number
}

export interface Verse {
  _id: string;
  number: string;
  text: string[];
  translation: string;
  synonyms: Synonym[];
  language: string;
}