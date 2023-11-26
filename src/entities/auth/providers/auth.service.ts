import { AHttpRequest, LS } from '@/utils'
import { z } from 'zod'
import { JWT_TOKENS_SCHEMA, type TJwtTokens } from '../model/tokens.model'
import { type ILogin } from '../model/login.model'
import { type ISignup } from '../model/signup.model copy'
import { inject, watch } from 'vue'
import router from '../../../router'

export class AuthService extends AHttpRequest<ILogin, TJwtTokens> {
  constructor() {
    super()
    this.watchReady()
    this.checkExisting()
    console.log(`AuthService`);
    
  }
  // ------------------------------------
  //              Api
  // ------------------------------------
  public override clear() {
    if (this.state.value.ready) {
      new LogoutRequest().load(this.state.value.data.access)
    }
    super.clear()
    LS.remove(`JWT_TOKENS`)
  }

  public refresh() {
    if (!this.state.value.ready) throw new Error()
    const request = new RefreshRequest().load(this.state.value.data.refresh)
    return this.reflectRequest(request)
  }

  public signup(data: ISignup) {
    const request = new SignupRequest().load(data)
    return this.reflectRequest(request)
  }
  // ------------------------------------
  //              Internal
  // ------------------------------------
  protected override createRequest(credentials: ILogin) {
    return this.createFetchRequest({
      method: `POST`,
      url: [`auth`, `login`],
      schema: JWT_TOKENS_SCHEMA,
      body: credentials
    })
  }

  private watchReady() {
    watch(this.state, ({ ready, data }) => {
      const preRedirect = LS.get(`PRE_AUTH_REDIRECT_ROUTE`)
      if (!ready) return
      LS.add(`JWT_TOKENS`, data)

      if (!location.pathname.includes(`auth`)) return

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
    this.modifyValue(tokens)
  }
  // ------------------------------------
  //              Mock
  // ------------------------------------
  protected override async loadMock() {
    return (await import(`../mock/auth.mock`)).LOGIN
  }
  // ------------------------------------
  //              Static
  // ------------------------------------
  public static inject() {
    return inject(AuthService.name) as AuthService
  }
}
// ====================================
//              Logout
// ====================================
export class SignupRequest extends AHttpRequest<ISignup, TJwtTokens> {
  // ------------------------------------
  //              Internal
  // ------------------------------------
  protected override createRequest(data: ISignup) {
    return this.createFetchRequest({
      method: `POST`,
      url: [`auth`, `signup`],
      schema: JWT_TOKENS_SCHEMA,
      body: data
    })
  }

  protected override async loadMock() {
    return (await import(`../mock/auth.mock`)).SIGNUP
  }
}
// ====================================
//              Refresh
// ====================================
class RefreshRequest extends AHttpRequest<string, TJwtTokens> {
  // ------------------------------------
  //              Internal
  // ------------------------------------
  protected override createRequest(token: string) {
    return this.createFetchRequest({
      method: `POST`,
      url: [`auth`, `refresh`],
      schema: JWT_TOKENS_SCHEMA,
      body: token
    })
  }

  protected override async loadMock() {
    return (await import(`../mock/auth.mock`)).REFRESH
  }
}
// ====================================
//              Logout
// ====================================
class LogoutRequest extends AHttpRequest<string, boolean> {
  // ------------------------------------
  //              Internal
  // ------------------------------------
  protected override createRequest(token: string) {
    return this.createFetchRequest({
      method: `POST`,
      url: [`auth`, `logout`],
      schema: z.boolean(),
      body: token
    })
  }

  protected override async loadMock() {
    return (await import(`../mock/auth.mock`)).LOGOUT
  }
}
