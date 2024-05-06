import { RequestError } from '..'
import type { IHttpConfig } from './http.model'
import { AHttpRequest } from './http.request'

export abstract class AFetchRequest<
  I,
  O,
  C extends IHttpConfig<I> = IHttpConfig<I>
> extends AHttpRequest<I, O, C> {
  private _abortController = new AbortController()

  // ------------------------------------
  //            Public
  // ------------------------------------
  protected async _sendRequest(request: C): Promise<O> {
    this._abortController = new AbortController()

    const url = request.url + this.getParamsString(request)
    const response = await fetch(url, {
      method: request.method,
      headers: request.headers,
      body: request.body ? JSON.stringify(request.body) : undefined,
      signal: this._abortController.signal
    })

    if (response.ok) {
      const json = await response.json()
      const parsed = this._schema.parse(json)
      return parsed
    } else {
      throw new RequestError(response.status, response.statusText)
    }
  }

  protected abort(): void {
    this._abortController.abort()
  }
}
