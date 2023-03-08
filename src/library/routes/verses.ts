import { RouteRecordRaw } from 'vue-router'

const VerseDetailsPage = () => import('../pages/verses/VerseDetailsPage.vue')


export const routes: Array<RouteRecordRaw> = [{
  path: 'verses',
  component: () => import('../pages/LibraryIndexPage.vue'),
  children: [
    {
      path: '',
      component: () => import('../pages/verses/VersesListPage.vue'),
    },
    {
      path: ':id',
      component: VerseDetailsPage,
      props: route => ({
        id: route.params.id,
        component: import('../components/VerseIndex.vue')
      }),
    },
    {
      path: ':id/card',
      component: VerseDetailsPage,
      props: route => ({
        id: route.params.id,
        component: import('../components/VerseCard.vue'),
        title: 'Card'
      }),
    },
    {
      path: ':id/content',
      component: VerseDetailsPage,
      props: route => ({
        id: route.params.id,
        component: import('../components/VerseContent.vue'),
        title: 'Content'
      }),
    },
    {
      path: ':id/synonyms',
      component: VerseDetailsPage,
      props: route => ({
        id: route.params.id,
        component: import('../components/VerseSynonyms.vue'),
        title: 'Synonyms'
      }),
    },
    {
      path: ':id/synonyms/:synonymId',
      component: VerseDetailsPage,
      props: route => ({
        id: route.params.id,
        componentProps: { synonymId: parseInt(route.params.synonymId as string) },
        component: import('../components/VerseSynonymEdit.vue'),
        title: 'Synonyms'
      })
    }
  ]
}]
