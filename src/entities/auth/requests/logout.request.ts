import { AFetchRequest } from '@/utils'
import { z } from 'zod'

export class LogoutRequest extends AFetchRequest<string, boolean> {
  // ------------------------------------
  //              Internal
  // ------------------------------------
  public load(token: string) {
    return this.configureRequest({
      method: `POST`,
      url: [`auth`, `logout`],
      schema: z.boolean(),
      body: token
    })
  }

  protected override async loadMock() {
    return (await import(`../auth.mock`)).LOGOUT
  }
}
