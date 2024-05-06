
export type THttpMethod = `GET` | `POST` | `PUT` | `DELETE`

export interface IHttpConfig<T> {
  url: string[]
  method: THttpMethod
  body: T
  params?: Record<string, string>
  headers?: Record<string, string>
}
