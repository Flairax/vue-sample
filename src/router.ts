import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
// import type { IUserDetailsRouteProps } from './root/app/pages/UserDetailsView.vue'
import { authGuard } from './entities'
import { appRoute } from './root/app/app.router';

export const ERootRoutes = {
    auth: `auth`,
    home: Symbol(),
    user: Symbol(),
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    appRoute,
    {
      path: '/auth',
      name: ERootRoutes.auth,
      component: () => import('./root/auth/RootAuth.vue'),
    }
  ]
})

;[authGuard].forEach((guard) => {
  router.beforeEach(guard)
})

export default router
