import type { IHttpConfig } from "../http/http.model"

export function createRequestMock<I, O, C extends IHttpConfig<I, O> = IHttpConfig<I, O>>(
  mock: (payload: C) => O,
  delayMs = 0
): (payload: C) => Promise<O> {
  return (payload: C) =>
    new Promise((resolve, reject) => {
      try {
        const value = mock(payload)
        setTimeout(() => resolve(value), delayMs)
      } catch (e) {
        setTimeout(() => reject(e), delayMs)
      }
    })
}
