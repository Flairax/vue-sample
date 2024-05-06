import { type IHttpConfig } from '..'
import type { TIntercepter } from '../core/request.core'

export type THttpIntercepter<I = any, O = any> = TIntercepter<
  Omit<Required<IHttpConfig<I>>, 'intercepters'>,
  O
>

export function createHttpIntercepter<I, O>(fn: THttpIntercepter<I, O>): THttpIntercepter<I, O> {
  return fn
}
