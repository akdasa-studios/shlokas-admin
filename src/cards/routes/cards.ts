import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'cards',
    component: () => import('../pages/CardsListPage.vue'),
  },
  {
    name: 'cards:create',
    path: 'cards/create/:verseId',
    component: () => import('../pages/CardsEditPage.vue'),
    props: route => ({
      verseId: route.params.verseId,
    }),
  },
  {
    name: 'cards:edit',
    path: 'cards/:id',
    component:  () => import('../pages/CardsEditPage.vue'),
    props: route => ({
      cardId: route.params.id,
    }),
  },
]
