import { RouteRecordRaw } from 'vue-router'

const VerseDetailsPage = () => import('../pages/VerseDetailsPage.vue')
const LibraryAddVersePage = () => import('../pages/LibraryAddVersePage.vue')


export const routes: Array<RouteRecordRaw> = [
  {
    path: 'verses',
    component: () => import('../pages/LibraryListPage.vue'),
  },
  {
    path: 'verses/add',
    component: LibraryAddVersePage,
  },
  {
    path: 'verses/:id',
    component: VerseDetailsPage,
    props: route => ({
      id: route.params.id,
    }),
  },
]
