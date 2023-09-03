export function mockResponse<T>(value: T, delayMs: number) {
  return new Promise<T>((res) => setTimeout(() => res(value), delayMs))
}

export function mockError(error: unknown) {
  return new Promise<any>((_, rej) => setTimeout(() => rej(error), 0))
}
