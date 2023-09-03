import { type TRequestMock, mockError, mockResponse } from '@/utils'
import { type ILogin } from '../model/login.model'
import { type ISignup } from '../model/signup.model copy'
import { type TJwtTokens } from '../model/tokens.model'

export const MOCK_CREDENTIALS = {
  email: `mock@gmail.com`,
  password: `1111`
}

const MOCK_TOKENS = {
  access: `aaa`,
  refresh: `bbb`
}

export const LOGIN: TRequestMock<ILogin, TJwtTokens> = ({ email, password }) => {
  if (email !== MOCK_CREDENTIALS.email) return mockError(`Wrong email`)
  if (password !== MOCK_CREDENTIALS.password) return mockError(`Wrong password`)
  console.log(`AAA`);
  
  return mockResponse(MOCK_TOKENS, 1)
}

export const SIGNUP: TRequestMock<ISignup, TJwtTokens> = ({ email, password, passwordRepeat }) => {
  if (password !== passwordRepeat) return mockError(`Passwords do not match`)

  return mockResponse(MOCK_TOKENS, 1)
}

export const REFRESH: TRequestMock<string, TJwtTokens> = (token) => {
  return mockResponse(MOCK_TOKENS, 1)
}

export const LOGOUT: TRequestMock<string, boolean> = (token) => {
  return mockResponse(true, 1)
}
