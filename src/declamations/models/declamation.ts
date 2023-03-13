 export interface Declamation {
  /** Unique identifier for the declamation */
  _id: string;

  /** ID of the VerseReference that the declamation is based on. */
  verseReferenceId: string;

  /** Theme. Each verse might have several declamations. */
  theme: string

  /** Path to the file */
  uri: string;

  /** Markers */
  markers: Marker[];
 }


export interface Marker {
  /** The start time of the marker in seconds. */
  start: number;
}

export const EmptyDeclamation = () => ({
  _id: '',
  verseReferenceId: '',
  theme: '',
  uri: '',
  markers: []
})

export function getVerseRefenceId(verseNumber: string) {
  return verseNumber
}