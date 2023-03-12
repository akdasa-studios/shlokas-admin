import { RouteRecordRaw } from 'vue-router'

const VerseDetailsPage = () => import('../pages/VerseDetailsPage.vue')
const VerseCreatePage = () => import('../pages/VerseCreatePage.vue')
const VerseEditModalContainer = () => import('../pages/VerseEditModalContainer.vue')


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'verses',
    component: () => import('../pages/VersesListPage.vue'),
  },
  {
    path: 'verses/create',
    component: VerseCreatePage,
  },
  {
    path: 'verses/:id',
    component: VerseDetailsPage,
    props: route => ({
      id: route.params.id,
    }),
  },
  {
    path: 'verses/:id/content',
    component: VerseEditModalContainer,
    props: route => ({
      id: route.params.id,
      component: import('../components/verseDetails/VerseContent.vue'),
      title: 'Content'
    }),
  },
  {
    path: 'verses/:id/synonyms',
    component: VerseEditModalContainer,
    props: route => ({
      id: route.params.id,
      component: import('../components/verseDetails/VerseSynonyms.vue'),
      title: 'Content'
    }),
  },
  {
    path: 'verses/:id/card',
    component: VerseEditModalContainer,
    props: route => ({
      id: route.params.id,
      component: import('../components/verseDetails/VerseCard.vue'),
      title: 'Content'
    }),
  },
]
