import { AFetchRequest } from "@/utils"
import type { ILogin } from "../models/login.model"
import { JWT_TOKENS_SCHEMA, type TJwtTokens } from "../models/tokens.model"

export class LoginRequest extends AFetchRequest<ILogin, TJwtTokens> {
  // ------------------------------------
  //              Internal
  // ------------------------------------
  public load(credentials: ILogin) {
    return this.configureRequest({
      method: `POST`,
      url: [`auth`, `login`],
      schema: JWT_TOKENS_SCHEMA,
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
