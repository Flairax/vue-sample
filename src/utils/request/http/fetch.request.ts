import { RequestError } from '..'
import type { IHttpConfig } from './http.model'
import { AHttpRequest } from './http.request'

export abstract class AFetchRequest<
  I,
  O,
  C extends IHttpConfig<I, O> = IHttpConfig<I, O>
> extends AHttpRequest<I, O, C> {
  private _abortController = new AbortController()

  // ------------------------------------
  //            Public
  // ------------------------------------
  protected async sendRequest(config: C): Promise<O> {
    this._abortController = new AbortController()

    const url = config.url + this.getParamsString(config)
    const response = await fetch(url, {
      method: config.method,
      headers: config.headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
      signal: this._abortController.signal
    })

    if (response.ok) {
      const json = await response.json()
      const parsed = config.schema.parse(json)
      return parsed
    } else {
      throw new RequestError(response.status, response.statusText)
    }
  }

  protected abort(): void {
    this._abortController.abort()
  }

  protected processError(error: unknown): RequestError {
      console.log(error)
      return new RequestError(1, `1`)
  }
  // ------------------------------------
  //            Private
  // ------------------------------------
  private getParamsString({ params }: C) {
    const entries = Object.entries(params ?? {})
    if (!entries.length) return ``
    return `?` + entries.map(([key, value]) => `${key}=${value}`).join(`&`)
  }
}
