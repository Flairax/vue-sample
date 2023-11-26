import { type TRequestIntercepter  } from '../request.http'

export const contentTypeIntercepter: TRequestIntercepter = (request, next) => {
  request.headers['Content-type'] = 'application/json'
  return next(request)
}
