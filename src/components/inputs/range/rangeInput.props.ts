import type { IInputProps } from '../_core/input.props'

export interface IRangeInputProps extends Omit<IInputProps<number>, 'placeholder'> {
  min: number;
  max: number;
  step: number;
}
