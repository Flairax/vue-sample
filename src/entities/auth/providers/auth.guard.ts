// import { inject } from "@angular/core";
// import { CanActivateFn, Router } from "@angular/router";
// import { AuthService } from "./auth.service";
// import { filter, map, tap } from "rxjs";

import { AuthService } from '..'
import router from '../../../router'
import { type RouteLocationNormalized } from 'vue-router'
import { LS, LocalStorage } from '../../../utils'

export function authGuard(to: RouteLocationNormalized) {
  const auth = AuthService.inject()
  console.log(to)
  if (to.meta.authRequired && !auth.state.value.ready) {
    LS.add(`PRE_AUTH_REDIRECT_ROUTE`, to.fullPath)
    return { name: 'auth' }
  }
}
