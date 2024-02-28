import { AFetchRequest } from "@/utils"
import { JWT_TOKENS_SCHEMA, type TJwtTokens } from "../models/tokens.model"

export class RefreshRequest extends AFetchRequest<string, TJwtTokens> {
  // ------------------------------------
  //              Internal
  // ------------------------------------
  public load(token: string) {
    return this.configureRequest({
      method: `POST`,
      url: [`auth`, `refresh`],
      schema: JWT_TOKENS_SCHEMA,
      body: token
    })
  }

  protected override async loadMock() {
    return (await import(`../auth.mock`)).REFRESH
  }
}
