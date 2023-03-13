import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [{
  path: 'users',
  component: () => import('../pages/UsersListPage.vue'),
}]
