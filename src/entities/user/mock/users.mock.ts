import { registerMock } from '@/utils/http/mock'
import type { IUser } from '../model/user.model'
import { USER_LIST_ID } from '../utils/ids'

export const USER_1_MOCK: IUser = Object.freeze({
  id: 1,
  name: `Andrii`,
  age: 28
})

export const USER_2_MOCK: IUser = Object.freeze({
  id: 2,
  name: `Vasya`,
  age: 19
})

export const USER_3_MOCK: IUser = Object.freeze({
  id: 3,
  name: `Inessa`,
  age: 22
})

export const USER_4_MOCK: IUser = Object.freeze({
  id: 4,
  name: `Olga`,
  age: 31
})

export const USERS_MOCK: readonly IUser[] = Object.freeze([
  USER_1_MOCK,
  USER_2_MOCK,
  USER_3_MOCK,
  USER_4_MOCK
])

registerMock<readonly IUser[]>(USER_LIST_ID, async () => USERS_MOCK)
