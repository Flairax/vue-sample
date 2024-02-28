import { shallowRef, type Ref } from 'vue'

export interface IInitialState {
  data: null
  initial: true
  loading: false
  delayed: false
  ready: false
  error: null
}

export interface ILoadingState {
  data: null
  initial: false
  loading: true
  delayed: false
  ready: false
  error: null
}

export interface IDelayedState {
  data: null
  initial: false
  loading: true
  delayed: true
  ready: false
  error: null
}

export interface IReadyState<T> {
  data: T
  initial: false
  loading: false
  delayed: false
  ready: true
  error: null
}

export interface IErrorState {
  data: null
  initial: false
  loading: false
  delayed: false
  ready: false
  error: RequestError
}

export class RequestError extends Error {
  constructor(
    readonly status: number,
    reason: string
  ) {
    super(reason)
  }
}

export type TRequestState<T> =
  | IInitialState
  | ILoadingState
  | IDelayedState
  | IReadyState<T>
  | IErrorState

export type TRequestMock<I, O> = (payload: I) => Promise<O>

export class RequestState<T> {
  private _delayId?: any

  public current: Ref<TRequestState<T>> = shallowRef(INITIAL_STATE)

  // ------------------------------------
  //              Public
  // ------------------------------------
  public setInitial() {
    this.setState(INITIAL_STATE)
  }

  public setLoading(delayMs: number) {
    this.setState(LOADING_STATE)
    this._delayId = setTimeout(() => this.setDelayed(), delayMs)
  }

  public setDelayed() {
    this.setState(DEALYED_STATE)
  }

  public setReady(data: T) {
    this.setState({
      data: Object.freeze(data),
      initial: false,
      loading: false,
      delayed: false,
      ready: true,
      error: null
    })
  }

  public setError(error: RequestError) {
    this.setState({
      data: null,
      initial: false,
      loading: false,
      delayed: false,
      ready: false,
      error
    })
  }
  // ------------------------------------
  //              Private
  // ------------------------------------
  private setState(newState: TRequestState<T>) {
    this.clearDelay()
    this.current.value = Object.freeze(newState)
  }

  private clearDelay() {
    if (this._delayId === undefined) return;
    clearTimeout(this._delayId)
    delete this._delayId
  }
}

export const INITIAL_STATE: IInitialState = Object.freeze({
  data: null,
  initial: true,
  loading: false,
  ready: false,
  error: null,
  delayed: false
})

const LOADING_STATE: ILoadingState = {
  data: null,
  initial: false,
  loading: true,
  delayed: false,
  ready: false,
  error: null
}

const DEALYED_STATE: IDelayedState = {
  data: null,
  initial: false,
  loading: true,
  delayed: true,
  ready: false,
  error: null
}
