import { ARequestReflector, LS } from '@/utils'
import { watch } from 'vue'
import router from '../../router'
import { type ILogin } from './models/login.model'
import { type ISignup } from './models/signup.model'
import { type TJwtTokens } from './models/tokens.model'
import { LoginRequest } from './requests/login.request'
import { LogoutRequest } from './requests/logout.request'
import { RefreshRequest } from './requests/refresh.request'
import { SignupRequest } from './requests/signup.request'

export class AuthService extends ARequestReflector<TJwtTokens> {
  constructor() {
    super()
    this.watchReady()
    this.checkExisting()
  }
  // ------------------------------------
  //              Api
  // ------------------------------------
  public signup(data: ISignup) {
    return this.reflectState(new SignupRequest(), data)
  }

  public login(credentials: ILogin) {
    return this.reflectState(new LoginRequest(), credentials)
  }

  public refresh() {
    if (!this.state.value.ready) throw new Error()
    return this.reflectState(new RefreshRequest(), this.state.value.data.refresh)
  }

  public clear() {
    if (this.state.value.ready) {
      new LogoutRequest().load(this.state.value.data.access)
    }
    super.clear()
    LS.remove(`JWT_TOKENS`)
  }
  // ------------------------------------
  //              Internal
  // ------------------------------------
  private watchReady() {
    watch(this.state, ({ ready, data }) => {
      if (!ready) return
      LS.add(`JWT_TOKENS`, data)

      if (!location.pathname.includes(`auth`)) return

      const preRedirect = LS.get(`PRE_AUTH_REDIRECT_ROUTE`)

      if (preRedirect) {
        router.push({ path: preRedirect })
        LS.remove(`PRE_AUTH_REDIRECT_ROUTE`)
      } else {
        router.push({ name: `home` })
      }
    })
  }

  private checkExisting() {
    const tokens = LS.get(`JWT_TOKENS`)
    if (!tokens) return
    this.setReady(tokens)
  }
}

export const AUTH =  new AuthService()
