import { createRequestMock } from '@/utils'
import { type ILogin } from './models/login.model'
import { type ISignup } from './models/signup.model'
import { type TJwtTokens } from './models/tokens.model'

export const MOCK_CREDENTIALS = {
  email: `mock@gmail.com`,
  password: `1111`
}

const MOCK_TOKENS = {
  access: `aaa`,
  refresh: `bbb`
}

export const LOGIN = createRequestMock<ILogin, TJwtTokens>(({ body: { email, password } }) => {
  if (email !== MOCK_CREDENTIALS.email) throw `Wrong email`
  if (password !== MOCK_CREDENTIALS.password) throw `Wrong password`
  return MOCK_TOKENS
})

export const SIGNUP = createRequestMock<ISignup, TJwtTokens>(
  ({ body: { password, passwordRepeat } }) => {
    if (password !== passwordRepeat) throw `Passwords do not match`
    return MOCK_TOKENS
  }
)

export const REFRESH = createRequestMock<string, TJwtTokens>(({ body }) => {
  return MOCK_TOKENS
})

export const LOGOUT = createRequestMock<string, boolean>(({ body }) => {
  return true
})
