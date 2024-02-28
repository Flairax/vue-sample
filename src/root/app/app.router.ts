import type { RouteRecordRaw } from 'vue-router'

export const EAppRoutes = {
  home: `home`
}

export const appRoute: RouteRecordRaw = {
  path: '/',
  name: 'app',
  component: () => import('./AppView.vue'),
  meta: {
    authRequired: true
  },
  children: [
    {
      path: '/',
      name: EAppRoutes.home,
      component: () => import('./pages/home/HomeView.vue')
    }
  ]
}
