import { RouteRecordRaw } from 'vue-router'

const VerseDetailsPage = () => import('../pages/VerseDetailsPage.vue')
const VerseCreatePage = () => import('../pages/VerseCreatePage.vue')


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'verses',
    component: () => import('../pages/VersesListPage.vue'),
  },
  {
    path: 'verses/create',
    component: VerseCreatePage,
  },
  {
    path: 'verses/:id',
    component: VerseDetailsPage,
    props: route => ({
      id: route.params.id,
    }),
  },
]
