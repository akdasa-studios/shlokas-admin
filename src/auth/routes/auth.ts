import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [{
  path: '/auth',
  component: () => import('../views/LogIn.vue'),
  name: 'login'
}]
