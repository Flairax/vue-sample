import { watch, type Ref } from 'vue'
import { RequestState, type IReadonlyRequest, type TRequestState, type IRequest } from '..'

export class ARequestReflector<T> implements IReadonlyRequest<T> {
  private _state = new RequestState<T>()
  private _stopReflect?: () => void
  private _request?: IRequest<unknown, unknown>

  public get state(): Readonly<Ref<TRequestState<T>>> {
    return this._state.current
  }

  protected async reflectRequest<C>(request: IRequest<C, T>, config: C): Promise<T>
  protected async reflectRequest<C, R>(
    request: IRequest<C, R>,
    config: C,
    unwrap: (response: R) => T
  ): Promise<T>
  protected async reflectRequest<C, R>(
    request: IRequest<C, R>,
    config: C,
    unwrap: (response: R) => T = (v) => v as any
  ): Promise<T> {
    this.releaseReflect()
    this._request = request
    this._stopReflect = watch(request.state, (s) => this.reflectState(s, unwrap))
    return request
      .load(config)
      .then(unwrap)
      .finally(() => this.releaseReflect())
  }

  private reflectState<D>(state: TRequestState<D>, unwrap: (response: D) => T) {
    if (!state.ready) return this._state.reflect(state)
    const value = unwrap(state.data)
    this._state.setReady(value)
  }

  protected clear() {
    if (this.state.value.initial) return
    this.releaseReflect()
    this._state.setInitial()
  }

  protected setData(value: T) {
    this.releaseReflect()
    this._state.setReady(value)
  }

  private releaseReflect() {
    if (!this._stopReflect || !this._request) return
    this._stopReflect()
    this._request.clear()
    delete this._stopReflect
    delete this._request
  }

  private setCache(value: T) {
    if (!this.getResponseId) return
    OBJECT_CACHE.set(this._schema as any, this.getResponseId(value))
  }

}
