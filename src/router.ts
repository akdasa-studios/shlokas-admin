import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsPage from './views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/verses'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/verses'
      },
      // {
      //   path: 'verses',
      //   component: () => import('@/verses/views/VersesView.vue'),
      //   children: [
      //     {
      //       path: '',
      //       component: () => import('@/verses/views/VersesListView.vue'),
      //     },
      //     {
      //       path: ':id',
      //       component: () => import('@/verses/views/VerseDetailsView.vue'),
      //       props: route => ({
      //         id: route.params.id,
      //         component: import('@/verses/components/VerseView.vue')
      //       }),
      //     },
      //     {
      //       path: ':id/interlinear',
      //       component: () => import('@/verses/views/VerseDetailsView.vue'),
      //       props: route => ({
      //         id: route.params.id,
      //         component: import('@/verses/components/InterlinearTranslation.vue')
      //       }),
      //     },
      //     {
      //       path: ':id/content',
      //       component: () => import('@/verses/views/VerseDetailsView.vue'),
      //       props: route => ({
      //         id: route.params.id,
      //         component: import('@/verses/components/VerseContent.vue')
      //       }),
      //     }
      //   ]
      // },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
