import { environment } from '../..'
import { AHttpRequest } from '../request.http'

AHttpRequest.addIntercepter((request, next) => {
  request.url.unshift(environment.api)
  return next(request)
});
