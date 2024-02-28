import { inject } from 'vue'

export type TLocalStorageKeys = `JWT_TOKENS` | `PRE_AUTH_REDIRECT_ROUTE`

export class LocalStorage {
  add(key: TLocalStorageKeys, value: unknown) {
    const item = typeof value === `string` ? value : JSON.stringify(value)
    localStorage.setItem(key, item)
  }

  remove(key: TLocalStorageKeys) {
    localStorage.removeItem(key)
  }

  get(key: TLocalStorageKeys) {
    const item = localStorage.getItem(key)
    if (item !== null && item[0] === `{`) return JSON.parse(item)
    return item
  }

  public static readonly root = new LocalStorage()
}

export const LS = new LocalStorage()
