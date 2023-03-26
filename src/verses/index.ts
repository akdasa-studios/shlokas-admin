// components:
export { default as VerseTextView } from './components/VerseTextView.vue'
export { default as VersesList } from './components/list/VersesList.vue'
export { default as VersesListItem } from './components/list/VersesListItem.vue'
export { default as VerseContent } from './components/details/VerseContent.vue'
export { default as VerseSynonymEdit } from './components/details/VerseSynonymEdit.vue'
export { default as VerseSynonymParser } from './components/details/VerseSynonymParser.vue'
export { default as VerseSynonyms } from './components/details/VerseSynonyms.vue'
export { default as VerseSynonymsList } from './components/details/VerseSynonymsList.vue'
export { default as CreateDeclamationActionSheet } from './components/details/CreateDeclamationActionSheet.vue'

// controllers:
export * from './composables/useSynonymsParser'
export * from './services/useVersesRepository'

// models:
export * from './models/verse'

// pages:
export { default as VerseCreatePage } from './pages/VersesCreatePage.vue'
export { default as VerseDetailsPage } from './pages/VersesDetailsPage.vue'
export { default as VerseEditPageContainer } from './pages/VersesEditPageContainer.vue'
export { default as VersesListPage } from './pages/VersesListPage.vue'

// routes:
export { routes } from './routes/verses'