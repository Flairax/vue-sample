import type { ZodType } from 'zod'

export type THttpMethod = `GET` | `POST` | `PUT` | `DELETE`

export interface IHttpConfig<I, O> {
  url: string[]
  method: THttpMethod
  schema: ZodType<O>
  body: I
  params?: Record<string, string>
  headers?: Record<string, string>
}
