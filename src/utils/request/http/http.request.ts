import { type THttpIntercepter } from '..'
import { ARequest } from '../core/request.core'
import type { IHttpConfig } from './http.model'

export abstract class AHttpRequest<I, O, C extends IHttpConfig<I>> extends ARequest<C, O> {
  // ------------------------------------
  //              Protected
  // ------------------------------------
  protected sendRequest(request: C): Promise<O> {
    return super.sendRequest(request, AHttpRequest.intercepters)
  }

  protected copyConfig(request: C): C {
    return {
      ...request,
      headers: request.headers ?? {},
      params: request.params ?? {}
    } as C
  }

  protected getParamsString({ params }: C) {
    const entries = Object.entries(params ?? {})
    if (!entries.length) return ``
    return `?` + entries.map(([key, value]) => `${key}=${value}`).join(`&`)
  }
  // ------------------------------------
  //              Static
  // ------------------------------------
  /* Init while attaching plugin */
  public static intercepters: THttpIntercepter<any, any>[] = []
}
