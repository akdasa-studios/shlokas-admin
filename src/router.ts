import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsView from './shared/views/TabsView.vue'


import { routes as libraryRoute } from './library'
import { routes as usersRoute } from './users'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/verses'
  },
  {
    path: '/tabs/',
    component: TabsView,
    children: [
      {
        path: '',
        redirect: '/tabs/verses'
      },
      ...libraryRoute,
      ...usersRoute
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
