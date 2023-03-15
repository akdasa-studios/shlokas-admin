import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'cards',
    component: () => import('../pages/CardsListPage.vue'),
  },
  {
    path: 'cards/create',
    component: () => import('../pages/CardsEditPage.vue'),
  },
  {
    path: 'cards/:id',
    component:  () => import('../pages/CardsEditPage.vue'),
    props: route => ({
      cardId: route.params.id,
    }),
  },
]
