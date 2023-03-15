import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'cards',
    component: () => import('../pages/CardsListPage.vue'),
  },
  {
    path: 'cards/:verseId/create',
    component: () => import('../pages/CardsCreatePage.vue'),
    props: route => ({
      verseId: route.params.verseId,
    }),
  },
  {
    path: 'cards/:id',
    component:  () => import('../pages/CardsCreatePage.vue'),
    props: route => ({
      cardId: route.params.id,
    }),
  },
]
