import { type App } from 'vue'
import { AHttpRequest, ARequest, type TRequestIntercepter } from '.'

export interface IRequestPluginOptions {
  interceptes?: TRequestIntercepter[]
  mocks?: boolean
  delayMs?: number
}

export const requestPlugin = {
  install(app: App<Element>, { interceptes, mocks, delayMs }: IRequestPluginOptions) {
    ARequest.delayMs = delayMs ?? 10000
    ARequest.mocks = mocks ?? false
    AHttpRequest.intercepters = interceptes ?? []
  }
}
