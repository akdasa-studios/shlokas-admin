export interface Synonym {
  words: string[];
  translation: string;
}

export interface Verse {
  id: string;
  number: string;
  text: string[];
  translation: string;
  synonyms: Synonym[];
}