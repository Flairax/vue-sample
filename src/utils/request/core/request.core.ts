import { watch, type Ref } from 'vue'
import z from 'zod'
import { IdObjectCache } from './request.cache'
import { RequestError, RequestState, type TRequestMock, type TRequestState } from './request.state'

export interface IReadonlyRequest<T> {
  readonly state: Readonly<Ref<TRequestState<T>>>
}

export interface IRequest<I, O> extends IReadonlyRequest<O> {
  load(config: I): Promise<O>
  clear(): void
}

export type TIntercepter<I, O> = (request: I, next: (request: I) => Promise<O>) => Promise<O>
// ====================================
//              Class
// ====================================
export abstract class ARequest<I, O> implements IReadonlyRequest<O> {
  private _state = new RequestState<O>()
  private _config?: I
  private _stopReflect?: () => void
  private _request?: IRequest<unknown, unknown>

  public get state(): Readonly<Ref<TRequestState<O>>> {
    return this._state.current
  }

  constructor(protected _schema: z.ZodSchema<O>) {

  }
  // ------------------------------------
  //              Abstract
  // ------------------------------------
  /** Forces to load containing mock file with dynamic import  */
  protected abstract _sendRequest(config: I): Promise<O>
  protected abstract abort(): void
  protected abstract loadMock(): Promise<TRequestMock<I, O>>
  protected abstract copyConfig(config: I): I
  protected getEntryByHash?(hash: string): object
  // ------------------------------------
  //              Public
  // ------------------------------------
  public clear() {
    if (this.state.value.initial) return
    this._abort()
    this._state.setInitial()
  }
  // ------------------------------------
  //              Send
  // ------------------------------------
  protected sendRequest(config: I, intercepters: TIntercepter<any, any>[]): Promise<O> {
    return (
      this.tryGetCache(config) ??
      this.watchRequest(config, this.applyIntercepters(intercepters, config))
    )
  }

  private watchRequest(config: I, promise: Promise<O>): Promise<O> {
    this._config = config
    this._abort()
    this._state.setLoading(ARequest.delayMs)

    return promise
      .then((v) => this.onResponse(v, config))
      .catch((e) => this.onError(e, config)) as Promise<O>
  }

  private onResponse(value: O, config: I) {
    if (config !== this._config) return // Aborted
    this.setCache(value)
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

  private tryGetCache(config: I) {
    if (!this.getRequestId) return
    const id = this.getRequestId(config)
    const cached = OBJECT_CACHE.get(this._schema as any, id) as O | undefined
    if (!cached) return
    this._abort()
    this._state.setReady(cached)
    return Promise.resolve(cached)
  }

  private setCache(value: O) {
    if (!this.getResponseId) return
    OBJECT_CACHE.set(this._schema as any, this.getResponseId(value))
  }
  // ------------------------------------
  //            Intercepters
  // ------------------------------------
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
      this.getLoader()
        .then((l) => l(finalRequest))
        .then(resolve)
        .catch(reject)
      return mappedPromise
    }) as Promise<O>
    
  }

  private async getLoader() {
    if (ARequest.mocks) return this.loadMock()
    return this._sendRequest
  }

  protected processError(error: unknown): RequestError {
    if (error instanceof RequestError) {
      return error
    } else if (error instanceof Error) {
      return new RequestError(600, error.message)
    } else {
      return new RequestError(600, error + ``)
    }
  }
  // ------------------------------------
  //            Abort
  // ------------------------------------
  private _abort() {
    if (this.releaseReflect()) return
    if (!this._state.current.value.loading) return
    delete this._config
    this.abort()
  }
  // ------------------------------------
  //            Static
  // ------------------------------------
  /* Init while attaching plugin */
  static mocks: boolean
  static delayMs: number
}

export const OBJECT_CACHE = new IdObjectCache()
