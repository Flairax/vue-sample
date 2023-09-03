import { type Ref, ref } from 'vue'

export interface IInputControl<T> {
  data: Ref<T>
  state: Ref<string>
  errors: Ref<string[]>
}

export function inputControl<T>(initial: T): IInputControl<T> {
  return {
    data: ref(initial) as Ref<T>,
    errors: ref([]),
    state: ref(``)
  }
}
