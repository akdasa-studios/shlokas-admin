import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'declamations',
    component: () => import('../pages/DeclamationsListPage.vue'),
  },
  {
    path: 'declamations/create',
    component: () => import('../pages/DeclamationsCreatePage.vue'),
    props: route => ({
      verseReference: route.query.verseReference,
    }),
  },
  {
    path: 'declamations/:id',
    component:  () => import('../pages/DeclamationsEditPage.vue'),
    props: route => ({
      id: route.params.id,
    }),
  },
]
