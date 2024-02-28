import { type ShallowRef } from 'vue'
import {
  RequestState,
  RequestError,
  type TRequestMock,
  type TRequestState
} from './request.state'

export interface IReadonlyRequest<T> {
  readonly state: ShallowRef<TRequestState<T>>
  clear(): void
}

export interface IRequest<I, O> extends IReadonlyRequest<O> {
  load(config: I): Promise<O>
}

export type TIntercepter<I, O> = (request: I, next: (request: I) => Promise<O>) => Promise<O>
// ====================================
//              Class
// ====================================
export abstract class ARequest<I, O> implements IReadonlyRequest<O> {
  private _state = new RequestState<O>()
  private _config?: I

  public get state() {
    return this._state.current
  }
  // ------------------------------------
  //              Abstract
  // ------------------------------------
  /** Forces to load containing mock file with dynamic import  */
  protected abstract sendRequest(config: I): Promise<O>
  protected abstract abort(): void
  protected abstract loadMock(): Promise<TRequestMock<I, O>>
  protected abstract copyConfig(config: I): I
  protected abstract processError(error: unknown): RequestError
  // ------------------------------------
  //              Public
  // ------------------------------------
  public clear() {
    this._abort()
    this._state.setInitial()
  }
  // ------------------------------------
  //              Protected
  // ------------------------------------
  protected configureRequest(config: I, intercepters: TIntercepter<any, any>[]): Promise<O> {
    return this.watchRequest(config, this.applyIntercepters(intercepters, config))
  }
  // ------------------------------------
  //            Private
  // ------------------------------------
  private watchRequest(config: I, request: Promise<O>): Promise<O> {
    this._config = config
    this._abort()
    this._state.setLoading(ARequest.delayMs)

    return request
      .then((v) => this.onResponse(v, config))
      .catch((e) => this.onError(e, config)) as Promise<O>
  }

  private onResponse(value: O, config: I) {
    if (config !== this._config) return // Aborted
    this._state.setReady(value)
    delete this._config
    return value
  }

  private onError(error: unknown, config: I) {
    if (config !== this._config) return // Aborted
    const processed = this.processError(error)
    this._state.setError(processed)
    throw processed
  }

  private _abort() {
    if (!this._state.current.value.loading) return
    delete this._config
    this.abort()
  }

  private async applyIntercepters(intercepters: TIntercepter<I, O>[], _config: I): Promise<O> {
    if (!intercepters.length) return this.getLoader().then((l) => l(_config))

    let resolve: (value: O) => void
    let reject: (error: unknown) => void
    const resolvePromise = new Promise<O>((res, rej) => {
      resolve = res
      reject = rej
    })

    let mappedPromise = resolvePromise
    let config = _config

    for (const intercepter of intercepters.slice(0, -1)) {
      const currPromise = mappedPromise
      const requestCopy = this.copyConfig(config)
      mappedPromise = intercepter(requestCopy, (newRequest) => {
        config = newRequest
        return currPromise
      })
    }

    const requestCopy = this.copyConfig(config)
    return intercepters[intercepters.length - 1](requestCopy, (finalRequest) => {
      console.log(intercepters, finalRequest)
      this.getLoader()
        .then((l) => l(finalRequest))
        .then(resolve)
        .catch(reject)
      return mappedPromise
    }) as Promise<O>
  }

  private async getLoader() {
    if (ARequest.mocks) return this.loadMock()
    return this.sendRequest
  }
  // ------------------------------------
  //            Static
  // ------------------------------------
  /* Init while attaching plugin */
  static mocks: boolean
  static delayMs: number
}
