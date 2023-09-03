import type { Ref } from 'vue'

export interface ICheckboxInputCtx<T, F> {
  title: string
  value: Ref<T | F>
  truthy: T
  falsy: F
}
