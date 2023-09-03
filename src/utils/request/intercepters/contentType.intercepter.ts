import { AHttpRequest } from '../request.http'

AHttpRequest.addIntercepter((request, next) => {
  request.headers['Content-type'] = 'application/json'
  return next(request)
})
