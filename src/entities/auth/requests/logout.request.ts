import { AFetchRequest } from '@/utils'
import { z } from 'zod'

export class LogoutRequest extends AFetchRequest<string, boolean> {
  constructor() {
    super(z.boolean())
  }
  // ------------------------------------
  //              Internal
  // ------------------------------------
  public load(token: string) {
    return this.sendRequest({
      method: `POST`,
      url: [`auth`, `logout`],
      body: token
    })
  }

  protected override async loadMock() {
    return (await import(`../auth.mock`)).LOGOUT
  }
}
