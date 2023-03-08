import { RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [{
  path: 'users',
  component: () => import('../views/UsersView.vue'),
}]
