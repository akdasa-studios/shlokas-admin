import { RouteRecordRaw } from 'vue-router'

const VerseDetailsPage = () => import('../pages/VersesDetailsPage.vue')
const VerseCreatePage = () => import('../pages/VersesCreatePage.vue')
const VersesEditPageContainer = () => import('../pages/VersesEditPageContainer.vue')


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
    component: VersesEditPageContainer,
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
    component: VersesEditPageContainer,
    props: route => ({
      id: route.params.id,
      component: import('../components/details/VerseSynonyms.vue'),
      title: 'Content'
    }),
  },
  {
    name: 'verses:synonym',
    path: 'verses/:id/synonyms/:synonymIdx',
    component: VersesEditPageContainer,
    props: route => ({
      id: route.params.id,
      component: import('../components/details/VerseSynonymEdit.vue'),
      componentProps: {
        synonymIdx: parseInt(route.params.synonymIdx as string)
      },
      title: 'Synonym'
    }),
  },
]
