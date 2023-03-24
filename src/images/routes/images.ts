import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'images',
    component: () => import('../pages/ImagesListPage.vue'),
  },
  {
    name: 'images:create',
    path: 'images/create/:verseId',
    component: () => import('../pages/ImagesEditPage.vue'),
    props: route => ({
      verseId: route.params.verseId,
    }),
  },
  {
    name: 'images:edit',
    path: 'images/:id',
    component:  () => import('../pages/ImagesEditPage.vue'),
    props: route => ({
      verseImageId: route.params.id,
    }),
  },
]
