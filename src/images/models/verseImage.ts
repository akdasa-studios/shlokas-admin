export interface VerseImage {
  _id: string;
  verseId: string;
  theme: string
  url: string;
  words: Word[];
}

export interface Word {
  text: string;
  line: number;
  posx: number;
}


export const EmptyImage = () => ({
  _id: '',
  verseId: '',
  theme: '',
  url: '',
  words: []
})
