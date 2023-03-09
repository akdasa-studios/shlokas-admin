import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsView from './shared/views/TabsView.vue'
import { useAuthStore } from './auth/stores/useAuthStore'

import { routes as authRoute } from './auth'
import { routes as libraryRoute } from './library'
import { routes as usersRoute } from './users'

const routes: Array<RouteRecordRaw> = [
  ...authRoute,
  {
    path: '/',
    redirect: '/tabs/verses',
    name: 'home'
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (to.name != 'login' && !authStore.isAuthenticated) {
    return { name: 'login' }
  }
})

export default router
