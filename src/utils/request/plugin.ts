import { type App } from 'vue'
import { AHttpRequest, ARequest, type THttpIntercepter } from '..'

export interface IHttpRequestPluginOptions {
  intercepters?: THttpIntercepter[]
  mocks?: boolean
  delayMs?: number
}

export const requestPlugin = {
  install(app: App<Element>, { intercepters, mocks, delayMs }: IHttpRequestPluginOptions) {
    ARequest.delayMs = delayMs ?? 3000
    ARequest.mocks = mocks ?? false
    AHttpRequest.intercepters = intercepters ?? []
  }
}
