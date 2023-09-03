import type { IInputControl } from './control';

export interface IInputProps<T> {
  control: IInputControl<T>;
  name: string
  help: string
  required?: boolean;
  label?: string;
}
