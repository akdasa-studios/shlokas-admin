import { RouteRecordRaw } from 'vue-router'

const VerseDetailsView = () => import('../views/verses/VerseDetailsView.vue')


export const routes: Array<RouteRecordRaw> = [{
  path: 'verses',
  component: () => import('../views/LibraryIndex.vue'),
  children: [
    {
      path: '',
      component: () => import('../views/verses/VersesListView.vue'),
    },
    {
      path: ':id',
      component: VerseDetailsView,
      props: route => ({
        id: route.params.id,
        component: import('../components/VerseIndex.vue')
      }),
    },
    {
      path: ':id/card',
      component: VerseDetailsView,
      props: route => ({
        id: route.params.id,
        component: import('../components/VerseCard.vue'),
        title: 'Card'
      }),
    },
    {
      path: ':id/content',
      component: VerseDetailsView,
      props: route => ({
        id: route.params.id,
        component: import('../components/VerseContent.vue'),
        title: 'Content'
      }),
    },
    {
      path: ':id/synonyms',
      component: VerseDetailsView,
      props: route => ({
        id: route.params.id,
        component: import('../components/VerseSynonyms.vue'),
        title: 'Synonyms'
      }),
    },
    {
      path: ':id/synonyms/:synonymId',
      component: VerseDetailsView,
      props: route => ({
        id: route.params.id,
        componentProps: { synonymId: parseInt(route.params.synonymId as string) },
        component: import('../components/VerseSynonymEdit.vue'),
        title: 'Synonyms'
      })
    }
  ]
}]
