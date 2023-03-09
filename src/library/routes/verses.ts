import { RouteRecordRaw } from 'vue-router'

const VerseDetailsPage = () => import('../pages/VerseDetailsPage.vue')


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'verses',
    component: () => import('../pages/LibraryListPage.vue'),
  },
  {
    path: 'verses/:id',
    component: VerseDetailsPage,
    props: route => ({
      id: route.params.id,
    }),
  },
]
