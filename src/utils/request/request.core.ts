import { reactive, ref, type Ref } from 'vue'

// // ====================================
// //              Model
// // ====================================
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
  error: string
}

export type TRequestState<T> =
  | IInitialState
  | ILoadingState
  | IDelayedState
  | IReadyState<T>
  | IErrorState

export type TRequestMock<I, O> = (payload: I) => Promise<O>

export interface IReadonlyHttpRequest<T> {
  state: Ref<TRequestState<T>>
}
// ====================================
//              Class
// ====================================
export abstract class ARequest<I, O> {
  public state: Ref<TRequestState<O>> = ref(INITIAL_STATE)
  private _requestId = 0
  private _delayId?: any

  // ------------------------------------
  //              Abstract
  // ------------------------------------
  protected abstract processError(error: unknown): string
  protected abstract createRequest(payload: I): Promise<O>
  protected loadMock?(): Promise<TRequestMock<I, O>>
  // ------------------------------------
  //              Api
  // ------------------------------------
  public async load(payload: I): Promise<O> {
    if (ARequest.mocks && this.loadMock) {
      return this.loadMock().then((mock) => {
        return this.wrapRequest(mock(payload))
      })
    }

    return this.wrapRequest(this.createRequest(payload))
  }

  public clear() {
    this.abort()
    this.setInitialState()
  }
  // ------------------------------------
  //            Protected
  // ------------------------------------
  protected reflectRequest(request: Promise<O>) {
    return this.wrapRequest(request)
  }

  protected modifyValue(value: O) {
    this.setReadyState(value)
  }
  // ------------------------------------
  //            Private
  // ------------------------------------
  private wrapRequest(request: Promise<O>): Promise<O> {
    this.abort()
    this.setLoadingState()

    this._delayId = setTimeout(() => {
      this.setDelayState()
    }, ARequest.delayMs)

    const requestId = ++this._requestId

    return request
      .then((res) => {
        return this.onResponse(res, requestId)
      })
      .catch(this.onError.bind(this)) as Promise<O>
  }

  private onResponse(value: O, requestId: number) {
    if (requestId !== this._requestId) return // Aborted
    this.clearDelay()
    this.setReadyState(value)
    return value
  }

  private onError(error: unknown) {
    const message = this.processError(error)
    this.clearDelay()
    this.setErrorState(message)
    throw new Error(message)
  }

  private abort() {
    if (!this.state.value.loading) return
    this.clearDelay()
    this._requestId++
  }
  // ------------------------------------
  //            States
  // ------------------------------------
  private setInitialState() {
    this.setState(INITIAL_STATE)
  }

  private setLoadingState() {
    this.setState(LOADING_STATE)
  }

  private setDelayState() {
    this.setState(DEALYED_STATE)
  }

  private setReadyState(data: O) {
    this.setState({
      data: Object.freeze(data),
      initial: false,
      loading: false,
      delayed: false,
      ready: true,
      error: null
    })
  }

  private setErrorState(error: string) {
    this.setState({
      data: null,
      initial: false,
      loading: false,
      delayed: false,
      ready: false,
      error
    })
  }

  private setState(newState: TRequestState<O>) {
    this.state.value = newState
  }

  private clearDelay() {
    clearTimeout(this._delayId)
    delete this._delayId
  }
  // ------------------------------------
  //            Static
  // ------------------------------------
  /* Init while attaching plugin */
  static mocks: boolean
  static delayMs: number
}

const INITIAL_STATE: IInitialState = Object.freeze({
  data: null,
  initial: true,
  loading: false,
  ready: false,
  error: null,
  delayed: false
})

const LOADING_STATE: ILoadingState = Object.freeze({
  data: null,
  initial: false,
  loading: true,
  delayed: false,
  ready: false,
  error: null
})

const DEALYED_STATE: IDelayedState = Object.freeze({
  data: null,
  initial: false,
  loading: true,
  delayed: true,
  ready: false,
  error: null
})
