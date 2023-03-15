// components:
export { default as VerseTextView } from './components/VerseTextView.vue'
export { default as VersesList } from './components/list/VersesList.vue'
export { default as VersesListItem } from './components/list/VersesListItem.vue'
export { default as VerseContent } from './components/verseDetails/VerseContent.vue'
export { default as VerseSynonymEdit } from './components/verseDetails/VerseSynonymEdit.vue'
export { default as VerseSynonymParser } from './components/verseDetails/VerseSynonymParser.vue'
export { default as VerseSynonyms } from './components/verseDetails/VerseSynonyms.vue'

// controllers:
export * from './controllers/useSynonymsParser'
export * from './controllers/useWordsPacker'
export * from './controllers/useVersesRepository'

// models:
export * from './models/verse'

// pages:
export { default as VerseCreatePage } from './pages/VersesCreatePage.vue'
export { default as VerseDetailsPage } from './pages/VersesDetailsPage.vue'
export { default as VerseEditPageContainer } from './pages/VersesEditPageContainer.vue'
export { default as VersesListPage } from './pages/VersesListPage.vue'

// routes:
export { routes } from './routes/verses'