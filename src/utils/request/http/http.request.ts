import type { THttpIntercepter } from '..'
import { ARequest } from '../core/request.core'
import type { IHttpConfig } from './http.model'

export abstract class AHttpRequest<I, O, C extends IHttpConfig<I, O>> extends ARequest<C, O> {
  // ------------------------------------
  //              Protected
  // ------------------------------------
  protected configureRequest(config: C): Promise<O> {
    return super.configureRequest(config, AHttpRequest.intercepters)
  }

  protected copyConfig({ url, method, schema, params, body, headers, ...rest }: C): C {
    return {
      url: [...url],
      method,
      params: { ...params },
      headers: { ...headers },
      body: body !== undefined ? JSON.parse(JSON.stringify(body)) : undefined,
      schema,
      ...rest
    } as C
  }
  // ------------------------------------
  //              Static
  // ------------------------------------
  /* Init while attaching plugin */
  public static intercepters: THttpIntercepter<any, any>[] = []
}
