import type { Ref } from 'vue'

export interface IRadioInputProps<T> {
  selected: Ref<T>;
  options: readonly T[];
  getTitle: (value: T) => string;
}
