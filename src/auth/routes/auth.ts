import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [{
  path: '/auth',
  component: () => import('../pages/LogInPage.vue'),
  name: 'login'
}]
