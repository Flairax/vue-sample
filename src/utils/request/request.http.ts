import { ZodType } from 'zod'
import { ARequest } from './request.core'
import { apiIntercepter } from './intercepters/api.intercepter'
import { contentTypeIntercepter } from './intercepters/contentType.intercepter'
import { intercepters } from './intercepters'

// ====================================
//              Model
// ====================================
export type TRequestMethod = `GET` | `POST` | `PUT` | `DELETE`

export interface IRequestCtx<O> {
  url: string[]
  method: TRequestMethod
  schema: ZodType<O>
  body?: unknown
  params?: Record<string, string>
  headers?: Record<string, string>
}

interface IRRequestCtx<O> extends Required<IRequestCtx<O>> {}

export type TRequestIntercepter = (
  request: IRRequestCtx<unknown>,
  next: (request: IRRequestCtx<unknown>) => Promise<unknown>
) => Promise<unknown>

export type TReadonlyRequest<R extends AHttpRequest<any, any>> = Omit<R, `load` | `clear`>
// ====================================
//              Class
// ====================================
export abstract class AHttpRequest<I, O> extends ARequest<I, O> {
  // ------------------------------------
  //            Internal
  // ------------------------------------
  protected async createFetchRequest(request: IRequestCtx<O>): Promise<O> {
    const irs = intercepters
    // const irs = AHttpRequest.intercepters
    if (!irs.length) return this.sendRequest(request);

    console.log(request);
    
    let resolve: (value: unknown) => void
    let reject: (error: unknown) => void
    const resolvePromise = new Promise<unknown>((res, rej) => {
      resolve = res
      reject = rej
    })
    let mappedPromise = resolvePromise
    let mappedRequest = request

    for (const intercepter of irs.slice(0, -1)) {
      const currPromise = mappedPromise
      const requestCopy = this.copyRequest(mappedRequest)
      mappedPromise = intercepter(requestCopy, (newRequest) => {
        mappedRequest = newRequest as IRequestCtx<O>
        return currPromise
      })
    }

    const requestCopy = this.copyRequest(mappedRequest)
    return irs[irs.length - 1](requestCopy, (finalRequest) => {
      this.sendRequest(finalRequest as IRequestCtx<O>)
        .then(resolve)
        .catch(reject)
      return mappedPromise
    }) as Promise<O>
  }

  protected override processError(error: unknown): string {
    return JSON.stringify(error)
  }

  private async sendRequest(request: IRequestCtx<O>) {
    const url = request.url + this.getParamsString(request)
    console.log(request, intercepters);

    const response = await fetch(url, {
      method: request.method,
      body: request.body ? JSON.stringify(request.body) : undefined,
      headers: request.headers
    })

    

    if (response.ok) {
      const json = await response.json()
      const parsed = request.schema.parse(json)
      return parsed
    } else {
      console.log(response)
      throw new Error(response.status + ``)
    }
  }

  private getParamsString({ params }: IRequestCtx<O>) {
    const entries = Object.entries(params ?? {})
    if (!entries.length) return ``
    return `?` + entries.map(([key, value]) => `${key}=${value}`).join(`&`)
  }

  private copyRequest({
    url,
    method,
    schema,
    params = {},
    body,
    headers = {}
  }: IRequestCtx<O>): IRRequestCtx<O> {
    return {
      url: [...url],
      method,
      params: { ...params },
      headers: { ...headers },
      body: body ? JSON.parse(JSON.stringify(body)) : undefined,
      schema
    }
  }
  // ------------------------------------
  //              Static
  // ------------------------------------
  // private static intercepters: TRequestIntercepter[] = [
  //   apiIntercepter,
  //   contentTypeIntercepter
  // ]

  // static addIntercepter(intercepter: TRequestIntercepter) {
  //   this.intercepters.push(intercepter)
  // }
}
