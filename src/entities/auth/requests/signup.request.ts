import { AFetchRequest } from '@/utils'
import type { ISignup } from '../models/signup.model'
import { JWT_TOKENS_SCHEMA, type TJwtTokens } from '../models/tokens.model'

export class SignupRequest extends AFetchRequest<ISignup, TJwtTokens> {
  constructor() {
    super(JWT_TOKENS_SCHEMA)
  }
  // ------------------------------------
  //              Internal
  // ------------------------------------
  public load(data: ISignup) {
    return this.sendRequest({
      method: `POST`,
      url: [`auth`, `signup`],
      body: data
    })
  }

  protected override async loadMock() {
    return (await import(`../auth.mock`)).SIGNUP
  }
}
