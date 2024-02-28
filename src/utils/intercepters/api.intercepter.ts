import { createHttpIntercepter, environment } from '..'

export const apiIntercepter = createHttpIntercepter((config, next) => {
  config.url.unshift(environment.api)
  console.log(config)

  return next(config)
})
