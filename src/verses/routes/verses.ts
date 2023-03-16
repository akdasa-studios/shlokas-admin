import { RouteRecordRaw } from 'vue-router'

const VerseDetailsPage = () => import('../pages/VersesDetailsPage.vue')
const VerseCreatePage = () => import('../pages/VersesCreatePage.vue')
const VerseEditModalContainer = () => import('../pages/VersesEditPageContainer.vue')


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
    name: 'verses:content',
    path: 'verses/:id/content',
    component: VerseEditModalContainer,
    props: route => ({
      id: route.params.id,
      component: import('../components/details/VerseContent.vue'),
      componentProps: {
        disableLanguage: true,
        disableNumber: true,
      },
      title: 'Content'
    }),
  },
  {
    name: 'verses:synonyms',
    path: 'verses/:id/synonyms',
    component: VerseEditModalContainer,
    props: route => ({
      id: route.params.id,
      component: import('../components/details/VerseSynonyms.vue'),
      title: 'Content'
    }),
  },
]
