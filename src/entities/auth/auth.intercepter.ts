import { RequestError, createHttpIntercepter } from '@/utils'
import { AUTH } from '..'
import router from '../../router'

export const authIntercepter = createHttpIntercepter((config, next) => {
  const tokens = AUTH.state.value.data
  if (!tokens) return next(config)

  config.headers['authorization'] = `Bearer ${tokens.access}`

  return next(config).catch((e) => {
    if (e.status !== 403) throw e
    return AUTH
      .refresh()
      .then(() => next(config))
      .catch((e) => {
        AUTH.clear()
        router.push({ name: 'auth' })
        throw new RequestError(401, `Token refresh failed`)
      })
  })
})
