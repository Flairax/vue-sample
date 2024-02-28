import { createHttpIntercepter } from '..'

export const contentTypeIntercepter = createHttpIntercepter((config, next) => {
  config.headers['Content-type'] = 'application/json'
  console.log(config)
  return next(config)
})
