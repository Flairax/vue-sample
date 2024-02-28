import { AFetchRequest } from "@/utils"
import type { ISignup } from "../models/signup.model"
import { JWT_TOKENS_SCHEMA, type TJwtTokens } from "../models/tokens.model"

export class SignupRequest extends AFetchRequest<ISignup, TJwtTokens> {
    // ------------------------------------
    //              Internal
    // ------------------------------------
    public load(data: ISignup) {
      return this.configureRequest({
        method: `POST`,
        url: [`auth`, `signup`],
        schema: JWT_TOKENS_SCHEMA,
        body: data
      })
    }
  
    protected override async loadMock() {
      return (await import(`../auth.mock`)).SIGNUP
    }
  }
