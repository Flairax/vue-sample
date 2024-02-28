import { type RouteLocationNormalized } from 'vue-router'
import { AUTH } from './auth.service'
import { LS } from '../../utils'

export function authGuard(to: RouteLocationNormalized) {
  if (to.meta.authRequired && !AUTH.state.value.ready) {
    LS.add(`PRE_AUTH_REDIRECT_ROUTE`, to.fullPath)
    return { name: 'auth' }
  }
}
