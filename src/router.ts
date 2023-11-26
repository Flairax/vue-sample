import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
// import type { IUserDetailsRouteProps } from './root/app/pages/UserDetailsView.vue'
import { authGuard } from './entities/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('./root/app/pages/HomeView.vue'),
      meta: {
        authRequired: true
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('./root/app/pages/HomeView.vue')
        },
        // {
        //   path: '/users',
        //   name: 'users',
        //   component: () => import('./root/app/pages/UserListView.vue')
        // },
        // {
        //   path: '/users/:id',
        //   name: 'user',
        //   props: (route): IUserDetailsRouteProps => ({
        //     id: +route.params.id ?? 1
        //   }),
        //   component: () => import('./root/app/pages/UserDetailsView.vue')
        // }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./root/auth/RootAuth.vue'),
    }
  ]
})

;[authGuard].forEach((guard) => {
  router.beforeEach(guard)
})

export default router
