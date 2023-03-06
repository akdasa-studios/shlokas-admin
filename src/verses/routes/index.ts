import { RouteRecordRaw } from 'vue-router'

export const route: RouteRecordRaw = {
  path: '/tabs/verses',
  component: () => import('../views/VersesIndex.vue'),
  children: [
    {
      path: '',
      component: () => import('../views/VersesListView.vue'),
    },
    {
      path: ':id',
      component: () => import('../views/VerseDetailsView.vue'),
      props: route => ({
        id: route.params.id,
        component: import('../components/VerseView.vue')
      }),
    },
    {
      path: ':id/interlinear',
      component: () => import('../views/VerseDetailsView.vue'),
      props: route => ({
        id: route.params.id,
        component: import('../components/InterlinearTranslation.vue')
      }),
    },
    {
      path: ':id/content',
      component: () => import('../views/VerseDetailsView.vue'),
      props: route => ({
        id: route.params.id,
        component: import('../components/VerseContent.vue')
      }),
    }
  ]
}
