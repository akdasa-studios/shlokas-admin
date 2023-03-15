export interface Card {
  _id: string;
  verseId: string;
  verseNumber: string;
  theme: string
  uri: string;
  words: Word[];
}

export interface Word {
  text: string;
  line: number;
  posx: number;
}


export const EmptyCard = () => ({
  _id: '',
  verseId: '',
  verseNumber: '',
  theme: '',
  uri: '',
  words: []
})
