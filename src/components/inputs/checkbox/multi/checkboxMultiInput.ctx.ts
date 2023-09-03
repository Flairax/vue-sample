import type { Ref } from 'vue'

export interface ICheckboxMultiInputCtx<T> {
  selected: Ref<T[]>;
  options: Ref<readonly T[]>;
  getTitle: (value: T) => string;
}
