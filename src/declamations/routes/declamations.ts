import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'declamations',
    component: () => import('../pages/DeclamationsListPage.vue'),
  },
  {
    name: 'declamations:create',
    path: 'declamations/create/of-:type:/:verseReference',
    component: () => import('../pages/DeclamationsEditPage.vue'),
    props: route => ({
      type: route.params.type,
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
