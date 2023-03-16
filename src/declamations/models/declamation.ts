import getUuid from 'uuid-by-string'

export type DeclamationType = 'verse' | 'translation'

export interface Declamation {
  /** Unique identifier for the declamation */
  _id: string;

  /** Number of VerseReference  */
  verseReference: string;

  type: DeclamationType;

  /** Theme. Each verse might have several declamations. */
  theme: string

  /** Path to the file */
  uri: string;

  /** Markers */
  markers: number[];
}


export const EmptyDeclamation = (verseReference='', type='verse', theme='default') => ({
  _id: '',
  verseReference,
  type,
  theme,
  uri: '',
  markers: []
} as Declamation)


export function getVerseRefenceId(verseReferenceNumber: string) {
  return getUuid(verseReferenceNumber)
}
