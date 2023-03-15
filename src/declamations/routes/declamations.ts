import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'declamations',
    component: () => import('../pages/DeclamationsListPage.vue'),
  },
  {
    name: 'declamations:create',
    path: 'declamations/create/:verseReference',
    component: () => import('../pages/DeclamationsCreatePage.vue'),
    props: route => ({
      verseReference: route.params.verseReference,
    }),
  },
  {
    name: 'declamations:edit',
    path: 'declamations/:id',
    component:  () => import('../pages/DeclamationsEditPage.vue'),
    props: route => ({
      id: route.params.id,
    }),
  },
]
