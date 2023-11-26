import { environment } from '../..'
import { type TRequestIntercepter } from '../request.http'


export const apiIntercepter: TRequestIntercepter = (request, next) => {
  // request.url.unshift(environment.api)
  return next(request)
}

