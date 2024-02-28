import { shallowRef, watch, type Ref } from 'vue'
import type { IReadonlyRequest, IRequest } from './request.core'
import { INITIAL_STATE, RequestState, type TRequestState } from './request.state'

export abstract class ARequestReflector<O> implements IReadonlyRequest<O> {
  private _state: Ref<TRequestState<O>> = shallowRef(INITIAL_STATE)
  private _abort?: () => void

  public get state(): Readonly<Ref<TRequestState<O>>> {
    return this._state
  }
  // ------------------------------------
  //              Public
  // ------------------------------------
  public clear(): void {
    if (this._abort) this._abort()
    this._state.value = INITIAL_STATE
  }
  // ------------------------------------
  //              Protected
  // ------------------------------------
  protected async reflectState<I>(request: IRequest<I, O>, config: I): Promise<O> {
    if (this._abort) this._abort()

    const stopHandle = watch(request.state, (s) => (this._state.value = s))
    this._abort = () => {
      stopHandle()
      request.clear()
      delete this._abort
    }

    return request.load(config).finally(() => {
      stopHandle()
      delete this._abort
    })
  }

  protected setReady(value: O) {
    const state = new RequestState<O>()
    state.setReady(value)
    this._state.value = state.current.value
  }
}
