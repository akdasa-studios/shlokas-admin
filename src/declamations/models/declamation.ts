import getUuid from 'uuid-by-string'


export interface Declamation {
  /** Unique identifier for the declamation */
  _id: string;

  /** Number of VerseReference  */
  verseReference: string;

  /** Theme. Each verse might have several declamations. */
  theme: string

  /** Path to the file */
  uri: string;

  /** Markers */
  markers: number[];
}


export const EmptyDeclamation = (verseReference='') => ({
  _id: '',
  verseReference,
  theme: '',
  uri: '',
  markers: []
})


export function getVerseRefenceId(verseReferenceNumber: string) {
  return getUuid(verseReferenceNumber)
}
