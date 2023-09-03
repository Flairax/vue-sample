import type { IInputProps } from '../_core/input.props'

export interface IGroupInputProps<T extends object> {
  submit: (value: T) => void
  default: T
}
