import { AFetchRequest } from "@/utils"
import { JWT_TOKENS_SCHEMA, type TJwtTokens } from "../models/tokens.model"

export class RefreshRequest extends AFetchRequest<string, TJwtTokens> {
  constructor() {
    super(JWT_TOKENS_SCHEMA)
  }
  // ------------------------------------
  //              Internal
  // ------------------------------------
  public load(token: string) {
    return this.sendRequest({
      method: `POST`,
      url: [`auth`, `refresh`],
      body: token
    })
  }

  protected override async loadMock() {
    return (await import(`../auth.mock`)).REFRESH
  }
}
