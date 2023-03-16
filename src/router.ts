import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import { routes as libraryRoute } from '@/verses'
import { TabsPage } from '@/shared'

import { useAuthStore, routes as authRoute } from '@/auth'
import { routes as declamationsRoute } from '@/declamations'
import { routes as usersRoute } from './users'
import { routes as imagesRoute } from './images'

const routes: Array<RouteRecordRaw> = [
  ...authRoute,
  {
    path: '/',
    redirect: '/tabs/verses',
    name: 'home'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/verses'
      },
      ...libraryRoute,
      ...usersRoute,
      ...declamationsRoute,
      ...imagesRoute
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (to.name != 'login' && !authStore.isAuthenticated) {
    return { name: 'login' }
  }
})

export default router
