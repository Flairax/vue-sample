import { AFetchRequest } from "@/utils"
import type { ILogin } from "../models/login.model"
import { JWT_TOKENS_SCHEMA, type TJwtTokens } from "../models/tokens.model"

export class LoginRequest extends AFetchRequest<ILogin, TJwtTokens> {
  constructor() {
    super(JWT_TOKENS_SCHEMA)
  }
  // ------------------------------------
  //              Internal
  // ------------------------------------
  public load(credentials: ILogin) {
    return this.sendRequest({
      method: `POST`,
      url: [`auth`, `login`],
      body: credentials
    })
  }
  // ------------------------------------
  //              Mock
  // ------------------------------------
  protected override async loadMock() {
    return (await import(`../auth.mock`)).LOGIN
  }
}
